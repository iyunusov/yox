'use client'
import { Button, CardHeader, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import CloseIcon from '@mui/icons-material/Close';
import { SyntheticEvent, useState } from "react";
import { deleteImageFromStorage } from "@/lib/firebase/storage";

interface ProductItemDeleteProps { productId: number; imageUrl: string; };
export default function ProductItemDelete ({ productId, imageUrl }: ProductItemDeleteProps) {
  const [open, setOpen] = useState(false);
  const user = useUserSession();
  const pathname = usePathname();
  const router = useRouter()

  const onDeleteProduct = (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setOpen(true)
  }

  const handleClose = (event: SyntheticEvent) => {
    event.stopPropagation();
    setOpen(false);
  }

  const deleteProduct = async (event: SyntheticEvent) => {
    handleClose(event)
    const response = await fetch(`/product/api/${productId}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    if (result.success) { 
      await deleteImageFromStorage(imageUrl)
      console.log(result.data);
      router.refresh()
    }
  }

  return (
    user?.uid && pathname.startsWith('/profile') && (
      <>
        <CardHeader
          onClick={onDeleteProduct}
          action={
            <IconButton aria-label="delete">
              <CloseIcon />
            </IconButton>
          }
          component={'div'}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-delete-product"
          aria-describedby="alert-dialog-delete-product-from-profile"
        >
          <DialogTitle id="alert-dialog-title">
            {"Think twice before doing anything! Once last it's last forever!!!"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteProduct} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    ) || <></>
  )
}
