import { LogoLightGrey } from "@/ui/components/logo/Ureca/LogoLightGrey";
import { verticalScrollable } from "@/ui/styles/Scrollable";
import { css } from "@emotion/react";
import { CloseRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { VerifyPhone, VerifyPhoneCode } from "../../../Phone";
import { SignupScene } from "../../types/SignupScene.type";
import { BasicInfoForm } from "../BasicInfoForm";
import { Welcome } from "../Welcome";
import { useSignupSection } from "./useSignupSection";

export type SignupSectionProps = {
  onBack: () => void;
};

export const SignupSection = ({ onBack }: SignupSectionProps) => {
  const {
    scene,
    handleBasicFormSubmit,
    handleVerifyPhoneSubmit,
    handleVerifyPhoneCodeSubmit,
    handleWelcomeAnimationComplete,
  } = useSignupSection();

  const getScene = (scene: SignupScene) => {
    switch (scene) {
      case SignupScene.Basic:
        return <BasicInfoForm onSubmit={handleBasicFormSubmit} />;
      case SignupScene.VerifyPhone:
        return <VerifyPhone onSubmit={handleVerifyPhoneSubmit} />;
      case SignupScene.VerifyPhoneCode:
        return <VerifyPhoneCode onSubmit={handleVerifyPhoneCodeSubmit} />;
      case SignupScene.Welcome:
        return (
          <Welcome
            onAnimationComplete={() => handleWelcomeAnimationComplete(onBack)}
          />
        );
    }
  };

  return (
    <article css={styles.root}>
      <div css={styles.backWrapper}>
        <Tooltip title={"로그인으로 돌아가기"}>
          <IconButton
            css={css`
              opacity: 0.8;
            `}
            onClick={onBack}
          >
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </div>

      <div css={styles.inner}>{getScene(scene)}</div>

      <div css={styles.logoWrapper}>
        <LogoLightGrey />
      </div>
    </article>
  );
};

const styles = {
  root: css`
    ${verticalScrollable}
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 380px;
    padding: 16px;
  `,
  backWrapper: css`
    position: absolute;
    top: 8px;
    right: 8px;
  `,
  inner: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  `,
  logoWrapper: css`
    position: relative;
    width: 64px;
    aspect-ratio: 4/2;
    margin: 16px auto;
  `,
};
