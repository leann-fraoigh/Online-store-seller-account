import { ActionFunctionArgs, redirect } from "react-router-dom";
import { postAdvertisement } from "../../api/post-advertisiment";
import { AdvertisementNew } from "../../models";

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case "PUT": {
      const dateNow = new Date().toISOString();
      const formData = await request.formData();
      const formObject = Object.fromEntries(formData.entries());

      const advertisement: AdvertisementNew = {
        views: 0,
        likes: 0,
        name: formObject?.name as string || '',
        description: formObject?.description as string || '',
        price: Number(formObject?.price) || 0,
        createdAt: dateNow,
        imageUrl: formObject?.imageUrl as string || '',
      };

      await postAdvertisement(advertisement);
      return redirect('/advertisements');
    }
    case "DELETE": {
      return;
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}