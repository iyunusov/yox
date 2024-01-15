import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

import { storage } from "./init";
import { uid } from "uid";

export async function updateProductImage(image: any) {
	const id = uid()
	try {
		if (!image || !image.name)
			throw new Error("A valid image has not been provided.");

		const publicImageUrl = await uploadImage(id, image);
		// await updateRestaurantImageReference(id, publicImageUrl);

		return publicImageUrl;
	} catch (error) {
		console.error("Error processing request:", error);
	}
}

async function uploadImage(id: string, image: any) {
	const filePath = `images/${id}/${image.name}`;
	const newImageRef = ref(storage, filePath);
	await uploadBytesResumable(newImageRef, image);

	return await getDownloadURL(newImageRef);
}

export async function deleteImageFromStorage(path: string) {
	const imageRef = ref(storage, path);
	return await deleteObject(imageRef);
}