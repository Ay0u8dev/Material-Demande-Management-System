import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MarcheForm from "./marche-form";
import BCForm from "./bc-form";
import ContratForm from "./contrat-form";
import AOForm from "./appel-offre-form";
import type {
  Marche,
  BonCommande,
  Contrat,
  AppelOffre,
} from "@/gestion_marche/types";
import { JSX } from "react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: "marche" | "bc" | "contrat" | "appelOffre";
  title: string;
  data?: Marche | BonCommande | Contrat | AppelOffre | null | undefined;
  onSubmit: (data: any) => void;
}

export default function FormModal({
  isOpen,
  onClose,
  formType,
  title,
  data,
  onSubmit,
}: FormModalProps): JSX.Element {
  const handleSubmit = (formData: any): void => {
    onSubmit(formData);
    onClose();
  };

  const renderForm = (): JSX.Element | null => {
    switch (formType) {
      case "marche":
        return (
          <MarcheForm
            marche={data as Marche}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case "bc":
        return (
          <BCForm
            bc={data as BonCommande | null}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case "contrat":
        return (
          <ContratForm
            contrat={data as Contrat | null}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case "appelOffre":
        return (
          <AOForm
            appelOffre={data as AppelOffre | null}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-lg bg-white p-0 shadow-xl sm:max-w-2xl">
        <DialogHeader className="border-b border-slate-200/80 px-6 py-4">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6">{renderForm()}</div>
      </DialogContent>
    </Dialog>
  );
}
