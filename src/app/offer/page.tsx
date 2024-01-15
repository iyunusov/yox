'use client'
import { Box, Button, FormHelperText, Paper, Stack, TextField } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { grey, blue } from "@mui/material/colors";
import { BaseSyntheticEvent, ChangeEvent, useCallback, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { deleteImageFromStorage, updateProductImage } from '@/lib/firebase/storage';
import Image from 'next/image';
import { useUserSession } from "@/hooks/useUserSession";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default function Page() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const user = useUserSession();
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    image: ''
  })
  const router = useRouter();
  
  useLayoutEffect(() => {
    onAuthStateChanged((user) => {
      if (!user?.uid) router.push('/auth');
    })
  }, [router]);

  const onTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setErrors(errors => ({ ...errors, title: '' }));
  }, [])

  const onDescriptionChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.target.value)
    setErrors(errors => ({ ...errors, description: '' }));
  }, [])

  const onFilezoneChange = useCallback(async ({ target }: BaseSyntheticEvent) => {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }
  
    setFile(image);
    setErrors(errors => ({ ...errors, image: '' }));
  }, [])

  const onSubmit = useCallback(async () => {
    let titleError = '', descriptionError = '', imageError = '';
    if (!title) { titleError = 'Please write down a title' }
    if (!description) { descriptionError = 'Please write down some description' }
    if (!file) { imageError = 'Please upload a preview image' }
    if (titleError || descriptionError || imageError) {
      return setErrors((_errors) => ({
        title: titleError,
        description: descriptionError,
        image: imageError
      }))
    }
    setLoadingSubmit(true);
    const imageUrl = await updateProductImage(file);
    if (imageUrl) {
      try {
        const response = await fetch ('/offer/api',  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user?.uid, title, description, imageUrl })
        })
        console.log(response)
      } catch (error) {
        await deleteImageFromStorage(imageUrl);
      }
    }
    setTitle('')
    setDescription('');
    setFile(null);
    setLoadingSubmit(false)
  }, [user, title, description, file])

  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
      height={{
        xs: 'calc(100vh - 64px)',
        sm: 'calc(100vh - 64px)',
      }}
    >
      <Paper
        sx={{
          width: { xs: '100%', sm: '480px' },
          p: 4
        }}>
        <Stack gap={2} position={'relative'}>
          <TextField
            value={title}
            label={'Title'}
            onChange={onTitleChange}
            error={!!errors.title}
            />
          {errors.title && (<FormHelperText error id="component-error-text">{errors.title}</FormHelperText>)}
          <Box display={'flex'}>
            <Textarea
              value={description}
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              onChange={onDescriptionChange}
              />
          </Box>
          {errors.description && (<FormHelperText error id="component-error-text">{errors.description}</FormHelperText>)}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onChange={onFilezoneChange}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
          </Button>
          {errors.image && (<FormHelperText error id="component-error-text">{errors.image}</FormHelperText>)}
          {file && <Image src={URL.createObjectURL(file)} width={100} height={100} alt={"preview"} />}          
          <LoadingButton
            color="primary"
            loading={loadingSubmit}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant={'contained'}
            onClick={onSubmit}
            >
            Post
          </LoadingButton>
        </Stack>
      </Paper>

    </Box>
  )
}