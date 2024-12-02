import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrap.config.js';

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email address',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email Verification',
    });
    console.log('Email sent successfully', response);
  } catch (error) {
    console.log(`Error sending verification message`, error);
    throw new Error(`Error sending verification message: ${error}`);
  }
};

export const sendWelcomeEmail = async ({ email, name }) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: '3048844d-33ac-4088-a8c9-6ceb5745d984',
      template_variables: {
        company_info_name: 'Temideewan Company',
        name,
      },
    });

    console.log(`Welcome email sent successfully`, response)
  } catch (error) {
    console.log(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};
