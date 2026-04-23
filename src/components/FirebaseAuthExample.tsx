import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import {
  auth,
  firebaseSignInWithGoogle,
  firebaseSignOut,
} from "@/integrations/firebase/client";
import {
  ensureUserProfile,
  subscribeToUserProfile,
  type UserProfile,
} from "@/integrations/firebase/userProfile";
import { Button } from "@/components/ui/button";

export function FirebaseAuthExample() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);

      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (u) {
        await ensureUserProfile(u);
        unsubscribeProfile = subscribeToUserProfile(u.uid, setProfile);
      }
    });

    return () => {
      if (unsubscribeProfile) unsubscribeProfile();
      unsubscribeAuth();
    };
  }, []);

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return (
      <div className="flex items-center gap-2">
        <Button asChild className="gradient-saffron text-primary-foreground">
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => firebaseSignInWithGoogle()}
        >
          Google
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">
        {profile
          ? `Hi, ${profile.displayName || profile.email} • ${profile.points} pts`
          : `Signed in as ${user.displayName || user.email}`}
      </span>
      <Button variant="outline" size="sm" onClick={() => firebaseSignOut()}>
        Sign out
      </Button>
    </div>
  );
}

