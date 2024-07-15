import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const UserDataSaver: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      syncUserData();
    }
  }, [isLoaded, isSignedIn, user]);

  const syncUserData = async () => {
    try {
      setStatus("Syncing user data...");
      const response = await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      console.error("Error syncing user data:", error);
      setStatus("Error syncing user data");
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }
};

export default UserDataSaver;
