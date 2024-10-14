import FirstStep from "@/components/house/onboarding/FirstStep";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Création d'annonce - 1ère étape",
   description: "Première étape du processus de création d'annonce",
};
export default function AddHouseFirstStep() {
   return <FirstStep/>;
}
