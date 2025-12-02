// WhatsApp Configuration
export const WHATSAPP_PHONE = "60179040344"; // Malaysia format without + or spaces
export const WHATSAPP_MESSAGE =
  "Hi! I'm interested in your travel services. Can you provide more information?";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
