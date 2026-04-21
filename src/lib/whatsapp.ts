export interface BookingData {
  name: string;
  email: string;
  mobile: string;
  service: string;
  budget: string;
  description: string;
  deadline?: string;
}

export const generateWhatsAppMessage = (data: BookingData): string => {
  const message = `*New Project Booking - QuantumX Technologies*

*Name:* ${data.name}
*Email:* ${data.email}
*Mobile:* ${data.mobile}
*Service:* ${data.service}
*Budget:* ${data.budget}
${data.deadline ? `*Deadline:* ${data.deadline}` : ''}

*Description:*
${data.description}`;

  return message;
};

export const redirectToWhatsApp = (data: BookingData, phoneNumber: string = '1234567890') => {
  const message = generateWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
