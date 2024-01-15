'use client'
import { Box, Paper, Typography } from "@mui/material";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductViewProps {
  product: Product;
}

export default function ProductView ({ product }: ProductViewProps) {
  const { title, description, image} = product;
  return (
    <Paper sx={{ maxWidth: '1080px', margin: 'auto', mt: 2, p: 4 }}>
      <Box display={'flex'} flexDirection={'row'} gap={4}>
        <Box position="relative" height={'480px'} width={'100%'}>
          <Image
            alt="preview Image"
            src={image}
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
        <Box width={'100%'}>
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
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        whiteSpace={'nowrap'}
        p={2}
        >
        {description}
      </Typography>
    </Paper>
  )
}