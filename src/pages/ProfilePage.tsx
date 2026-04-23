import { useEffect, useState } from "react";
import { auth } from "@/integrations/firebase/client";
import { subscribeToUserProfile, type UserProfile } from "@/integrations/firebase/userProfile";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = subscribeToUserProfile(user.uid, (data) => {
      setProfile(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-6 text-center">

      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        My Profile
      </h1>

      <div className="bg-green-100 p-6 rounded-lg shadow">

        <p className="text-lg font-semibold">
          👤 {profile?.displayName || "User"}
        </p>

        <p className="mt-2 text-xl font-bold text-green-700">
          🎉 Points: {profile?.points || 0}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Explored States: {profile?.exploredStates?.length || 0}
        </p>

      </div>
    </div>
  );
};

export default ProfilePage;