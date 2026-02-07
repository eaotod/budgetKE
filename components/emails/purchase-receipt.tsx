import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
  Section,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface PurchaseReceiptEmailProps {
  customerName: string;
  orderId: string;
  productName: string;
  downloadLink: string;
  amount: number;
}

export const PurchaseReceiptEmail = ({
  customerName,
  orderId,
  productName,
  downloadLink,
  amount,
}: PurchaseReceiptEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your BudgetKE Order Receipt #{orderId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Order Confirmed!</Heading>
          <Text style={text}>Hi {customerName},</Text>
          <Text style={text}>
            Thank you for purchasing <strong>{productName}</strong>. Your
            payment of <strong>KES {amount}</strong> via M-Pesa has been
            received.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={downloadLink}>
              Download Your Template
            </Button>
          </Section>

          <Text style={text}>
            If the button doesn&apos;t work, copy and paste this link into your
            browser:
            <br />
            {downloadLink}
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            BudgetKE • Nairobi, Kenya
            <br />
            Questions? Reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
  color: "#2d8f4e", // BudgetKE Green
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#2d8f4e",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const footer = {
  color: "#9ca299",
  fontSize: "12px",
  textAlign: "center" as const,
};
