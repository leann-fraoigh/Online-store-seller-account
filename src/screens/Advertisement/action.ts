import { ActionFunctionArgs, redirect } from "react-router-dom";
import { patchAdvertisement } from "../../api/patch-advertisiment";
import { AdvertisementPatch } from "../../models";

export async function action({ request, params }: ActionFunctionArgs) {
  const currentPath = new URL(request.url).pathname.toString();
  const cuttentAdId = params.advertisementId?.slice(1) ?? '';

  switch (request.method) {
    case "PATCH": {
      // TODO: Возможно, доработать, чтобы не отправлялось, если данные не изменились
      const formData = await request.formData();
      const formObject = Object.fromEntries(formData.entries());
      
      const advertisement: AdvertisementPatch = {
        name: formObject?.name as string || '',
        description: formObject?.description as string || '',
        price: Number(formObject?.price) || 0,
        imageUrl: formObject?.imageUrl as string || '',
      };

      await patchAdvertisement(advertisement, cuttentAdId);

      return redirect(currentPath);
    }
    // case "DELETE": {
    //   return;
    // }
    default: {
      throw new Error('Method not allowed');
    }
  }
}