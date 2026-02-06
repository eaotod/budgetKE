"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteItem } from "@/app/manage/actions";
import { toast } from "sonner";

interface DeleteActionProps {
  id: string;
  type: "products" | "categories" | "bundles";
  name: string;
}

export function DeleteAction({ id, type, name }: DeleteActionProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteItem(id, type);
    setIsDeleting(false);

    if (result.success) {
      toast.success(`${name} deleted successfully`);
    } else {
      toast.error(`Failed to delete ${name}: ${result.error}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-white focus:bg-red-600 font-medium p-2 rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-[2rem] border-gray-100 p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black text-gray-900 tracking-tight">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 font-medium mt-2">
            This will permanently delete{" "}
            <span className="text-gray-900 font-bold">"{name}"</span> and all
            associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 gap-3">
          <AlertDialogCancel className="rounded-full px-6 py-6 font-bold text-gray-500 hover:bg-gray-50 border-gray-100 transition-all">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full px-8 py-6 font-bold bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-100 border-none transition-all"
          >
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
