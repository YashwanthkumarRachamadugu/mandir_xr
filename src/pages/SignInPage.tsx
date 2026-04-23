import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  auth,
  firebaseSignInWithEmail,
  firebaseSignInWithGoogle,
  firebaseSignUpWithEmail,
} from "@/integrations/firebase/client";
import { ensureUserProfile } from "@/integrations/firebase/userProfile";

const emailOk = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

const firebaseErrorToMessage = (e: any) => {
  const code = typeof e?.code === "string" ? e.code : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/email-already-in-use":
      return "An account already exists with that email. Try signing in.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed.";
    case "auth/operation-not-allowed":
      return "This sign-in method is disabled in Firebase console.";
    default:
      return typeof e?.message === "string"
        ? e.message
        : "Authentication failed. Please try again.";
  }
};

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("redirect") || "/";
  }, [location.search]);

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) navigate(redirectTo, { replace: true });
    });
  }, [navigate, redirectTo]);

  const submitEmailPassword = async () => {
    if (!emailOk(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setBusy(true);
    try {
      const cred =
        tab === "signin"
          ? await firebaseSignInWithEmail(email.trim(), password)
          : await firebaseSignUpWithEmail(email.trim(), password);

      if (tab === "signup" && fullName.trim().length > 0) {
        await updateProfile(cred.user, { displayName: fullName.trim() });
      }
      await ensureUserProfile(cred.user);
      toast.success(tab === "signin" ? "Welcome back!" : "Account created!");
      navigate(redirectTo, { replace: true });
    } catch (e: any) {
      toast.error(firebaseErrorToMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const submitGoogle = async () => {
    setBusy(true);
    try {
      const cred = await firebaseSignInWithGoogle();
      await ensureUserProfile(cred.user);
      toast.success("Signed in with Google.");
      navigate(redirectTo, { replace: true });
    } catch (e: any) {
      toast.error(firebaseErrorToMessage(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="section-padding min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-lg">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-strong border-border/60">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-2xl gradient-saffron flex items-center justify-center mx-auto mb-4 glow-saffron">
                <Lock className="text-primary-foreground" size={32} />
              </div>
              <CardTitle className="font-display">Sign in to MandirXR</CardTitle>
              <CardDescription>
                Earn points, track exploration, and unlock AR experiences.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                onClick={submitGoogle}
                disabled={busy}
              >
                Continue with Google
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border/60" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border/60" />
              </div>

              <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="pl-9"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                      <p className="text-xs text-muted-foreground">
                        Tip: enable Email/Password provider in Firebase Authentication.
                      </p>
                    </div>

                    <Button
                      type="button"
                      className="w-full gradient-saffron text-primary-foreground"
                      onClick={submitEmailPassword}
                      disabled={busy}
                    >
                      Sign in
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full name</Label>
                      <Input
                        id="fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      <p className="text-xs text-muted-foreground">
                        This is saved to your profile and shown across the app.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email2">Email</Label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email2"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="pl-9"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password2">Password</Label>
                      <Input
                        id="password2"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        autoComplete="new-password"
                      />
                    </div>

                    <Button
                      type="button"
                      className="w-full gradient-saffron text-primary-foreground"
                      onClick={submitEmailPassword}
                      disabled={busy}
                    >
                      Create account
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-start gap-2 text-xs text-muted-foreground glass rounded-lg p-3">
                <ShieldCheck size={16} className="text-india-green shrink-0 mt-0.5" />
                <p>
                  We store only your profile (name/email/photo), points, and exploration progress in
                  Firebase.
                </p>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Back to{" "}
                <Link to="/" className="text-primary hover:underline">
                  Home
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;

