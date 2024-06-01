import UserSettings from "@/components/dashboard/UserSettings";
import UserSocialForm from "@/components/dashboard/UserSocialForm";
import ProfilePreview from "@/components/pages/ProfilePreview";
import { authOptions } from "@/lib/authOptions";
import connectMongoDb from "@/lib/dbConnect";
import { UserPage } from "@/models/Onboarding";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; // Fixed import

import React from "react";

async function Page() { // Fixed function name
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/');
  }

  await connectMongoDb();
  const exists = await UserPage.findOne({
    owner: session.user?.email,
  });

  return (
    <div className="text-white flex h-screen">
      <div className="md:w-1/2 w-screen overflow-y-scroll py-4">
        <UserSettings user={exists} session={session} />
        <UserSocialForm/>
      </div>
      <div className="md:w-1/2 hidden md:block h-screen py-4">
        <ProfilePreview/>
        
      </div>
    </div>
  );
}

export default Page;
