const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const EMAIL = process.env.NEXT_PUBLIC_EMAIL as string;

export const API = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        "dev-email-address": EMAIL,
      },
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};
