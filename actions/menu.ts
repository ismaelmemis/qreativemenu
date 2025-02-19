'use server';
import fs from 'node:fs/promises';
const { URL } = 'node:url';

import type { z } from 'zod';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { CampaignValues } from '@/components/dashboard/menu/menu-forms/create-campaign';
import { createTableAreaSchema, createTableSchema } from '@/lib/schemas';
import { Options } from 'qr-code-styling';
import { compareSync, hashSync } from 'bcrypt-ts';
import { formatImageName, getFileExtension, getFileNameOnly } from '@/utils/images';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCategory(values: any, formData: FormData) {
  const { name, menuId, description } = values;

  const imageFile = formData.get('file') as File;

  if (imageFile) {
    const arrayBuffer = await imageFile.arrayBuffer();

    const imageFileName = getFileNameOnly(imageFile.name);
    const imageFileExtension = getFileExtension(imageFile.name) as string;

    const imageFileLink = formatImageName(imageFileName, imageFileExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${imageFileLink}`, buffer);

    const category = await db.category.create({
      data: {
        name: name,
        labels: '',
        menuId: menuId,
        image: imageFileLink,
        description: description,
        slug: name.toLowerCase(),
      },
    });

    const menu = (await db.menu.findFirst({
      where: {
        id: menuId,
      },
      select: {
        menuView: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as { menuView: Array<{ id: string; text: string; data: any }> };

    if (!menu?.menuView) {
      const newMenuView = [
        {
          id: category.id,
          parent: 0,
          droppable: true,
          text: name,
          data: {
            image: `${imageFileLink}`,
            description: description,
          },
        },
      ];

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          menuView: newMenuView,
        },
      });
    } else {
      const newMenuView = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(menu?.menuView as Array<any>),
        {
          id: category.id,
          parent: 0,
          text: name,
          droppable: true,
          data: {
            image: `${imageFileLink}`,
            description: description,
          },
        },
      ];

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          menuView: newMenuView,
        },
      });
    }
  } else {
    const category = await db.category.create({
      data: {
        name: name,
        labels: '',
        menuId: menuId,
        description: description,
        slug: name.toLowerCase(),
      },
    });

    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
      },
    });

    if (!menu?.menuView) {
      const newMenuView = [
        {
          id: category.id,
          parent: 0,
          droppable: true,
          text: name,
          data: {
            description: description,
          },
        },
      ];

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          menuView: newMenuView,
        },
      });
    } else {
      const newMenuView = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(menu?.menuView as Array<any>),
        {
          id: category.id,
          parent: 0,
          text: name,
          droppable: true,
          data: {
            // image: `${imageFile.name}`,
            description: description,
          },
        },
      ];

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          menuView: newMenuView,
        },
      });
    }
  }

  revalidatePath(`dashboard/menu-management/${menuId}`);
  revalidatePath(`/danielgallegos/menu/${menuId}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createMenuItem(
  values: any,
  keyIngredients: any,
  allergens: any,
  formData: FormData
) {
  const { name, description, price, menuId, category, calorie, time } = values;

  const dbKeyIngredients = keyIngredients.map((ing: { value: any }) => {
    return ing.value;
  });

  const dbAllergens = allergens.map((all: { value: any }) => {
    return all.value;
  });

  const imageFile = formData.get('file') as File;

  if (imageFile) {
    const arrayBuffer = await imageFile.arrayBuffer();

    const imageFileName = getFileNameOnly(imageFile.name);
    const imageFileExtension = getFileExtension(imageFile.name) as string;

    const imageFileLink = formatImageName(imageFileName, imageFileExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${imageFileLink}`, buffer);

    const menuItem = await db.menuItem.create({
      data: {
        name: name,
        categoryId: category,
        image: imageFileLink,
        description: description,
        price: price,
        ingredients: dbKeyIngredients,
        allergens: dbAllergens,
        preparationTime: parseInt(time),
        calories: parseInt(calorie),
      },
      include: {
        Category: true,
      },
    });

    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
      },
    });

    const newMenuView = [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(menu?.menuView as Array<any>),
      {
        id: menuItem.id,
        parent: category,
        text: name,
        droppable: false,
        data: {
          image: imageFileLink,
          description: description,
          price: price,
          ingredients: dbKeyIngredients,
          allergens: dbAllergens,
          preparationTime: parseInt(time),
          calories: parseInt(calorie),
        },
      },
    ];

    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: newMenuView,
      },
    });
  } else {
    const menuItem = await db.menuItem.create({
      data: {
        name: name,
        categoryId: category,
        description: description,
        price: price,
        ingredients: dbKeyIngredients,
        allergens: dbAllergens,
        preparationTime: parseInt(time),
        calories: parseInt(calorie),
      },
      include: {
        Category: true,
      },
    });

    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
      },
    });

    const newMenuView = [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(menu?.menuView as Array<any>),
      {
        id: menuItem.id,
        parent: category,
        text: name,
        droppable: false,
        data: {
          description: description,
          price: price,
          ingredients: dbKeyIngredients,
          allergens: dbAllergens,
          preparationTime: parseInt(time),
          calories: parseInt(calorie),
        },
      },
    ];

    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: newMenuView,
      },
    });
  }

  revalidatePath(`dashboard/menu-management/${menuId}`);
  revalidatePath(`/danielgallegos/menu/${menuId}`);
}

export async function updateMenuView(treeData: any, menuId: string) {
  const currentMenu = await db.menu.findUnique({
    where: {
      id: menuId,
    },
    select: {
      menuView: true,
    },
  });

  if (JSON.stringify(currentMenu?.menuView) !== JSON.stringify(treeData)) {
    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: treeData,
      },
    });

    revalidatePath(`dashboard/menu-management/cm66o9o3r0003guttkd0q2mlw`);
  }
}

export async function updateMenuCategory(menuItemId: string, parentId: string) {
  await db.menuItem.update({
    where: {
      id: menuItemId,
    },
    data: {
      categoryId: parentId,
    },
  });
}

export async function deleteItem(itemId: string | number, menuId: string) {
  const menu = (await db.menu.findFirst({
    where: {
      id: menuId,
    },
    select: {
      menuView: true,
    },
  })) as { menuView: Array<{ id: string | number }> };

  const updatedMenuView = menu?.menuView?.filter((item) => {
    return item.id !== itemId;
  });

  await db.menu.update({
    where: {
      id: menuId,
    },
    data: {
      menuView: updatedMenuView,
    },
  });

  await db.menuItem.delete({
    where: {
      id: itemId.toString(),
    },
  });

  revalidatePath(`dashboard/menu-management/${menuId}`);
}

export async function deleteCategory(catId: string | number, menuId: string) {
  const menu = (await db.menu.findFirst({
    where: {
      id: menuId,
    },
    select: {
      menuView: true,
    },
  })) as { menuView: Array<{ id: string | number; parent: string | number }> };

  const updatedMenuView = menu?.menuView
    ?.filter((item) => {
      return item.parent !== catId;
    })
    .filter((item) => {
      return item.id !== catId;
    });

  const allItems = menu?.menuView
    .filter((item) => {
      return item.parent === catId;
    })
    .map((item) => {
      return item.id;
    });

  for (const itemId of allItems) {
    await db.menuItem.delete({
      where: {
        id: itemId.toString(),
      },
    });
  }

  await db.category.delete({
    where: {
      id: catId.toString(),
    },
  });

  await db.menu.update({
    where: {
      id: menuId,
    },
    data: {
      menuView: updatedMenuView,
    },
  });

  revalidatePath(`dashboard/menu-management/${menuId}`);
}

export async function editCategory(values: any, catId: string, formData: FormData) {
  const { name, menuId, description } = values;

  const imageFile = formData.get('file') as File;

  if (!imageFile) {
    const menu = (await db.menu.findFirst({
      where: {
        id: menuId,
      },
      select: {
        menuView: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as { menuView: Array<{ id: string; text: string; data: any }> };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedMenuView = (menu?.menuView as Array<any>)?.map((item) => {
      if (item.id === catId) {
        return {
          ...item,
          text: name,
          data: {
            ...item.data,
            description: description,
          },
        };
      } else {
        return item;
      }
    });

    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: updatedMenuView,
      },
    });

    await db.category.update({
      where: {
        id: catId,
      },
      data: {
        name: name,
        description: description,
        slug: name.toLowerCase(),
      },
    });
  } else {
    const arrayBuffer = await imageFile.arrayBuffer();

    const imageFileName = getFileNameOnly(imageFile.name);
    const imageFileExtension = getFileExtension(imageFile.name) as string;

    const imageFileLink = formatImageName(imageFileName, imageFileExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${imageFileLink}`, buffer);

    const menu = (await db.menu.findFirst({
      where: {
        id: menuId,
      },
      select: {
        menuView: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as { menuView: Array<{ id: string; text: string; data: any }> };

    const updatedMenuView = menu?.menuView?.map((item) => {
      if (item.id === catId) {
        return {
          ...item,
          text: name,
          data: {
            ...item.data,
            description: description,
            image: imageFileLink,
          },
        };
      } else {
        return item;
      }
    });

    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: updatedMenuView,
      },
    });

    await db.category.update({
      where: {
        id: catId,
      },
      data: {
        name: name,
        description: description,
        image: imageFileLink,
      },
    });
  }

  revalidatePath(`dashboard/menu-management/${menuId}`);
}

export async function editMenuItem(
  values: any,
  itemId: any,
  keyIngredients: any,
  allergens: any,
  formData: FormData
) {
  const { name, description, price, menuId, calorie, time } = values;

  const dbKeyIngredients = keyIngredients.map((ing: { value: any }) => {
    return ing.value;
  });

  const dbAllergens = allergens.map((all: { value: any }) => {
    return all.value;
  });

  const imageFile = formData.get('file') as File;

  if (!imageFile) {
    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
      },
    });

    const updatedMenuView = menu?.menuView?.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          text: name,
          data: {
            ...item.data,
            description: description,
            price: price,
            ingredients: dbKeyIngredients,
            allergens: dbAllergens,
            preparationTime: parseInt(time),
            calories: parseInt(calorie),
          },
        };
      } else {
        return item;
      }
    });

    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: updatedMenuView,
      },
    });

    await db.menuItem.update({
      where: {
        id: itemId,
      },
      data: {
        name: name,
        description: description,
        price: price,
        ingredients: dbKeyIngredients,
        allergens: dbAllergens,
        preparationTime: parseInt(time),
        calories: parseInt(calorie),
      },
    });
  } else {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${imageFile.name}`, buffer);

    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
      },
    });

    const updatedMenuView = menu?.menuView?.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          text: name,
          data: {
            ...item.data,
            description: description,
            price: price,
            ingredients: dbKeyIngredients,
            allergens: dbAllergens,
            preparationTime: parseInt(time),
            calories: parseInt(calorie),
            image: imageFile.name,
          },
        };
      } else {
        return item;
      }
    });

    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        menuView: updatedMenuView,
      },
    });

    await db.menuItem.update({
      where: {
        id: itemId,
      },
      data: {
        name: name,
        description: description,
        price: price,
        ingredients: dbKeyIngredients,
        allergens: dbAllergens,
        preparationTime: parseInt(time),
        calories: parseInt(calorie),
        image: imageFile.name,
      },
    });
  }

  revalidatePath(`dashboard/menu-management/${menuId}`);
}

export async function updateMenuSettings(values: any, menuId: string, formData: FormData) {
  const coverImageFile = formData.get('coverImage') as File;
  const coverLogoFile = formData.get('coverLogo') as File;
  const coverVideo = formData.get('coverVideo') as File;

  console.log('Test Theme', values.theme);

  if (!coverImageFile && !coverLogoFile && !coverVideo) {
    await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        name: values.name,
        theme: values.theme,
      },
    });
  } else {
    if (coverImageFile) {
      const arrayBuffer = await coverImageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const coverImageName = getFileNameOnly(coverImageFile.name);
      const coverImageExtension = getFileExtension(coverImageFile.name) as string;

      const coverImageLink = formatImageName(coverImageName, coverImageExtension);

      await fs.writeFile(`./public/uploads/${coverImageLink}`, buffer);

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          name: values.name,
          theme: values.theme,
          coverImage: coverImageLink,
        },
      });
    }

    if (coverLogoFile) {
      const arrayBuffer = await coverLogoFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const coverLogoName = getFileNameOnly(coverLogoFile.name);
      const coverLogoExtension = getFileExtension(coverLogoFile.name) as string;

      const coverLogoLink = formatImageName(coverLogoName, coverLogoExtension);

      await fs.writeFile(`./public/uploads/${coverLogoLink}`, buffer);

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          name: values.name,
          theme: values.theme,
          coverLogo: coverLogoLink,
        },
      });
    }

    if (coverVideo) {
      const arrayBuffer = await coverVideo.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const coverVideoName = getFileNameOnly(coverVideo.name);
      const coverVideoExtension = getFileExtension(coverVideo.name) as string;

      const coverVideoLink = formatImageName(coverVideoName, coverVideoExtension);

      await fs.writeFile(`./public/uploads/${coverVideoLink}`, buffer);

      await db.menu.update({
        where: {
          id: menuId,
        },
        data: {
          name: values.name,
          theme: values.theme,
          coverVideo: coverVideoLink,
        },
      });
    }
  }

  revalidatePath(`dashboard/menu-management/${menuId}`);
}

export async function createCampaign(values: CampaignValues, menuId: string, formData: FormData) {
  const image = formData.get('image') as File;
  const coverImage = formData.get('coverImg') as File;

  if (!image && !coverImage) {
    await db.campaign.create({
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        menuId: menuId,
      },
    });
  }

  if (image && !coverImage) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const imageName = getFileNameOnly(image.name);
    const imageExtension = getFileExtension(image.name) as string;

    const imageLink = formatImageName(imageName, imageExtension);

    await fs.writeFile(`./public/uploads/${imageLink}`, buffer);
    await db.campaign.create({
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        menuId: menuId,
        image: image.name,
      },
    });
  }

  if (coverImage && !image) {
    const arrayBuffer = await coverImage.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${coverImage.name}`, buffer);

    await db.campaign.create({
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        menuId: menuId,
        coverImg: coverImage.name,
      },
    });
  }

  if (coverImage && image) {
    const arrayBuffer = await coverImage.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${coverImage.name}`, buffer);

    const arrayBuffer2 = await image.arrayBuffer();
    const buffer2 = new Uint8Array(arrayBuffer2);
    await fs.writeFile(`./public/uploads/${image.name}`, buffer2);

    await db.campaign.create({
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        menuId: menuId,
        image: image.name,
        coverImg: coverImage.name,
      },
    });
  }

  revalidatePath(`dashboard/campaigns`);
}

export async function updateCampaign(
  values: CampaignValues,
  campaignId: string,
  formData: FormData
) {
  const image = formData.get('image') as File;
  const coverImage = formData.get('coverImg') as File;

  if (!image && !coverImage) {
    await db.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
      },
    });
  }

  if (image && !coverImage) {
    const arrayBuffer = await image.arrayBuffer();

    const imageName = getFileNameOnly(image.name);
    const imageExtension = getFileExtension(image.name) as string;

    const imageLink = formatImageName(imageName, imageExtension);

    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${imageLink}`, buffer);
    await db.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        image: imageLink,
      },
    });
  }

  if (coverImage && !image) {
    const arrayBuffer = await coverImage.arrayBuffer();

    const coverImageName = getFileNameOnly(coverImage.name);
    const coverImageExtension = getFileExtension(coverImage.name) as string;

    const coverImageLink = formatImageName(coverImageName, coverImageExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${coverImageLink}`, buffer);

    await db.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        coverImg: coverImageLink,
      },
    });
  }

  if (coverImage && image) {
    const arrayBuffer = await coverImage.arrayBuffer();

    const coverImageName = getFileNameOnly(coverImage.name);
    const coverImageExtension = getFileExtension(coverImage.name) as string;

    const coverImageLink = formatImageName(coverImageName, coverImageExtension);

    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${coverImageLink}`, buffer);

    const arrayBuffer2 = await image.arrayBuffer();

    const imageName = getFileNameOnly(image.name);
    const imageExtension = getFileExtension(image.name) as string;

    const imageLink = formatImageName(imageName, imageExtension);

    const buffer2 = new Uint8Array(arrayBuffer2);
    await fs.writeFile(`./public/uploads/${imageLink}`, buffer2);

    await db.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        name: values.name,
        description: values.description,
        featured: values.featured,
        image: imageLink,
        coverImg: coverImageLink,
      },
    });
  }

  revalidatePath(`dashboard/campaigns`);
}

export async function createTableArea(
  values: z.infer<typeof createTableAreaSchema>,
  venueId: string
) {
  await db.tableArea.create({
    data: {
      name: values.name,
      venueId: venueId,
    },
  });

  revalidatePath('dashboard/table-management');
}

export async function createTable(values: z.infer<typeof createTableSchema>, venue: any) {
  const table = await db.table.create({
    data: {
      name: values.name,
      capacity: values.capacity,
      tableAreaId: values.tableArea,
      venueId: venue.id,
    },
  });

  const options: Options = {
    width: 1280,
    height: 1280,
    data: `http://localhost:3000/${venue.slug}?table=${table.id}`,
    type: 'svg',
    image: undefined,
    dotsOptions: {
      type: 'square',
      color: '#000',
    },
    backgroundOptions: {
      color: '#FFF',
    },
    cornersSquareOptions: {
      type: 'square',
    },
    cornersDotOptions: {
      type: 'square',
    },
  };

  await db.qRCode.create({
    data: {
      code: `http://localhost:3000/${venue.slug}?table=${table.id}`,
      settings: options,
      venueId: venue.id,
      tableId: table.id,
      purpose: 'TABLE_ORDER',
    },
  });

  revalidatePath('dashboard/table-management');
}

export async function updateTable(values: z.infer<typeof createTableSchema>, tableId: string) {
  if (!values.tableArea) {
    await db.table.update({
      where: {
        id: tableId,
      },
      data: {
        name: values.name,
        capacity: values.capacity,
      },
    });
  } else {
    await db.table.update({
      where: {
        id: tableId,
      },
      data: {
        name: values.name,
        capacity: values.capacity,
        tableAreaId: values.tableArea,
      },
    });
  }

  revalidatePath('dashboard/table-management');
}

export async function deleteTable(itemId: string) {
  await db.table.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath('dashboard/table-management');
}

export async function updateTableStatus(tableId: string, status: string) {
  if (status === 'IN_PROGRESS') {
    await db.waiterCall.update({
      where: {
        id: tableId,
      },
      data: {
        status: 'IN_PROGRESS',
      },
    });
  }

  if (status === 'RESOLVED') {
    await db.waiterCall.update({
      where: {
        id: tableId,
      },
      data: {
        status: 'RESOLVED',
      },
    });
  }

  if (status === 'CANCELLED') {
    await db.waiterCall.update({
      where: {
        id: tableId,
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  revalidatePath('dashboard/menu-notifications');
}

export async function updateQRAction(options: Options, formData: FormData, qrCodeId: string) {
  const image = formData.get('file') as File;

  if (image) {
    const arrayBuffer = await image.arrayBuffer();

    const imageName = getFileNameOnly(image.name);
    const imageExtension = getFileExtension(image.name) as string;

    const imageLink = formatImageName(imageName, imageExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/qr/logo/${imageLink}`, buffer);

    await db.qRCode.update({
      where: {
        id: qrCodeId,
      },
      data: {
        settings: options,
        image: imageLink,
      },
    });
  } else {
    await db.qRCode.update({
      where: {
        id: qrCodeId,
      },
      data: {
        settings: options,
      },
    });
  }

  revalidatePath('/dashboard/');
  revalidatePath('/dashboard/qr-code');
}

export async function addWaiterCall(tableId: string, venueId: string) {
  const waiterCallData = await db.waiterCall.create({
    data: {
      tableId: tableId,
      venueId: venueId,
    },
  });

  return waiterCallData;
}

export async function deleteWaiterCall(callId: string) {
  await db.waiterCall.delete({
    where: {
      id: callId,
    },
  });

  revalidatePath('dashboard/menu-notifications');
}

export async function updateMainBranchSettings(values: any, venueId: string, formData: FormData) {
  const logoImage = formData.get('logo') as File;
  const venueImage = formData.get('venueImage') as File;

  console.log('Logo Image:', logoImage, 'Venue Image:', venueImage);

  if (!logoImage && !venueImage) {
    const { branchName, address, currency } = values;

    await db.venue.update({
      where: {
        id: venueId,
      },
      data: {
        branchName: branchName,
        currency: currency,
        address: address,
      },
    });
  }

  if (logoImage && !venueImage) {
    const arrayBuffer = await logoImage.arrayBuffer();

    const logoImageName = getFileNameOnly(logoImage.name);
    const logoImageExtension = getFileExtension(logoImage.name) as string;

    const logoImageLink = formatImageName(logoImageName, logoImageExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${logoImageLink}`, buffer);

    const { branchName, address, currency } = values;

    await db.venue.update({
      where: {
        id: venueId,
      },
      data: {
        branchName: branchName,
        currency: currency,
        address: address,
        logo: logoImageLink,
      },
    });
  }

  if (!logoImage && venueImage) {
    const arrayBuffer = await venueImage.arrayBuffer();

    const venueImageName = getFileNameOnly(venueImage.name);
    const venueImageExtension = getFileExtension(venueImage.name) as string;

    const venueImageLink = formatImageName(venueImageName, venueImageExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${venueImageLink}`, buffer);

    const { branchName, address, currency } = values;

    await db.venue.update({
      where: {
        id: venueId,
      },
      data: {
        branchName: branchName,
        currency: currency,
        address: address,
        image: venueImageLink,
      },
    });
  }

  if (logoImage && venueImage) {
    const arrayBuffer1 = await venueImage.arrayBuffer();

    const venueImageName = getFileNameOnly(venueImage.name);
    const venueImageExtension = getFileExtension(venueImage.name) as string;

    const venueImageLink = formatImageName(venueImageName, venueImageExtension);

    const buffer1 = new Uint8Array(arrayBuffer1);
    await fs.writeFile(`./public/uploads/${venueImageLink}`, buffer1);

    const arrayBuffer2 = await logoImage.arrayBuffer();

    const logoImageName = getFileNameOnly(logoImage.name);
    const logoImageExtension = getFileExtension(logoImage.name) as string;

    const logoImageLink = formatImageName(logoImageName, logoImageExtension);

    const buffer2 = new Uint8Array(arrayBuffer2);
    await fs.writeFile(`./public/uploads/${logoImageLink}`, buffer2);

    const { branchName, address, currency } = values;

    await db.venue.update({
      where: {
        id: venueId,
      },
      data: {
        branchName: branchName,
        currency: currency,
        address: address,
        logo: logoImageLink,
        image: venueImageLink,
      },
    });
  }

  revalidatePath(`/dashboard/account/venue-settings`);
}

export async function updateBranchContact(values: any, venueId: string) {
  const { email, telephone, whatsapp } = values;

  await db.venue.update({
    where: {
      id: venueId,
    },
    data: {
      email: email,
      phone: telephone,
      whatsapp: whatsapp,
    },
  });

  revalidatePath(`/dashboard/account/venue-settings`);
}

export async function updateBranchWifi(values: any, venueId: string) {
  const { name, password, encryption } = values;

  await db.venue.update({
    where: {
      id: venueId,
    },
    data: {
      wifiAddress: name,
      wifiPassword: password,
      wifiProtocol: encryption,
    },
  });
}

export async function updateProfileSettingsAction(values: any, formData: FormData, userId: string) {
  const image = formData.get('file') as File;

  if (!image) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: values.username,
      },
    });
  }

  if (image) {
    const arrayBuffer = await image.arrayBuffer();

    const imageName = getFileNameOnly(image.name);
    const imageExtension = getFileExtension(image.name) as string;

    const imageLink = formatImageName(imageName, imageExtension);

    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${imageLink}`, buffer);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: values.username,
        image: imageLink,
      },
    });
  }

  revalidatePath(`/dashboard/account/profile`);
}

export async function updatePasswordAction(values: any, userId: string) {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (user?.password) {
    const passwordMatch = compareSync(values.password, user.password);

    if (!passwordMatch) {
      return { error: 'Girdiğiniz şifre Hatalı! Lütfen Tekrar Deneyin' };
    }

    const hashedPassword = hashSync(values.newPassword, 10);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath(`/dashboard/account/profile`);
  }
}

export async function switchMenuStatus(value: boolean, menuId: string) {
  await db.menu.update({
    where: {
      id: menuId,
    },
    data: {
      isActive: value,
    },
  });

  revalidatePath(`/dashboard/menu-management`);
}

export async function switchMenuArchiveStatus(value: boolean, menuId: string) {
  await db.menu.update({
    where: {
      id: menuId,
    },
    data: {
      archived: !value,
    },
  });

  revalidatePath(`/dashboard/menu-management`);
}

export async function archiveCampaignHandler(campaignId: string, status: boolean) {
  await db.campaign.update({
    where: {
      id: campaignId,
    },
    data: {
      archived: status,
    },
  });

  revalidatePath(`/dashboard/campaigns`);
}

export async function switchCampaignStatus(campaignId: string, value: boolean) {
  await db.campaign.update({
    where: {
      id: campaignId,
    },
    data: {
      isActive: value,
    },
  });

  revalidatePath(`/dashboard/campaigns`);
}
