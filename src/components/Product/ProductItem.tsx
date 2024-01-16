'use client'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import ProductItemDelete from "./ProductItemDelete";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem ({ product }: ProductItemProps) {
  const { id, title, description, image} = product;
  const router = useRouter();

  const onProductClick = () => {
    router.push(`/product/${id}`)
  }

  return (
    <Grid
      item
      key={id}
      xs={12}
      sm={6}
      md={3}
      lg={2}
      onClick={onProductClick}
      >
      <CardActionArea>
        <Card sx={{ maxWidth: 345 }}>
          <ProductItemDelete productId={id} imageUrl={image} />
          <CardMedia
            component="img"
            alt="preview Image"
            height="140"
            image={image}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  )
}