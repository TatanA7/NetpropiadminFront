import { useForm } from 'react-hook-form';
import _ from '@lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/system';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Price from './Price';
import BasicInformation from './Step1BasicInformation';
import ProductImagesTab from './ProductImagesTab';

const steps = ['Información básica', 'Imágenes de la propiedad', 'Precio'];

const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function HelpCenterSupport() {
  const [currentTab, setCurrentTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function onSubmit(data) {
    console.log(data);
  }

  if (_.isEmpty(form)) {
    return null;
  }
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const steppersPanelMap = {
    0: <BasicInformation />,
    1: <ProductImagesTab />,
    2: <Price />,
  };

  return (
    <div
      style={{ backgroundColor: '#FFFFFF' }}
      className="flex flex-col    items-center p-24 sm:p-40 rounded-2xl container"
    >
      <div
        style={{ backgroundColor: '#f1f5f9' }}
        className="flex flex-col items-center   p-24 sm:p-40 rounded-2xl container"
      >
        <div className="flex flex-col w-full max-w-4xl">
          <Box className="w-full">
            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <div>
              {allStepsCompleted() ? (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </>
              ) : (
                <>
                  {steppersPanelMap[activeStep]}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ))}
                  </Box>
                </>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterSupport;
