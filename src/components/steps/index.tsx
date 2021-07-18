import { Steps } from 'antd';
import { useTranslation } from 'react-i18next';

interface Iprops{
  step: any;
  setStep?: any;
}

const { Step } = Steps;

const StepsUsuario: React.FC<Iprops> = ({ step }: Iprops) => {
  const { t } = useTranslation();

  return(
    <Steps
      type="navigation"
      current={step}
      className="site-navigation-steps"
    >
      <Step status="process" title={t('steps.processo.step1')} />
      <Step status="process" title={t('steps.processo.step2')} />
      <Step status="process" title={t('steps.processo.step3')} />
    </Steps>
  );
}

export default StepsUsuario;