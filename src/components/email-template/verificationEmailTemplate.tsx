import {
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Container,
} from "@react-email/components";
import React from "react";

interface VerificationEmailProps {
  username: string;
  otp: number;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code is {otp.toString()}</Preview>
      <Container style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        <Section
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Row>
            <Heading as="h2" style={{ color: "#333", marginBottom: "20px" }}>
              Hello, {username}!
            </Heading>
          </Row>
          <Row>
            <Text
              style={{ color: "#555", lineHeight: "1.5", marginBottom: "10px" }}
            >
              We're excited to have you on board! To complete your registration,
              please use the following verification code:
            </Text>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: "24px",
                color: "#4a90e2",
                fontWeight: "bold",
                margin: "20px 0",
              }}
            >
              {otp}
            </Text>
          </Row>
          <Row>
            <Text style={{ color: "#555", marginBottom: "10px" }}>
              If you didn't request this code, no further action is required.
            </Text>
          </Row>
          <Row>
            <Text style={{ color: "#777", fontSize: "12px" }}>
              Thank you for choosing us!
            </Text>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
