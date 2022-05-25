import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

// import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';

import BasicInfoTab from './BasicInfoTab';
import ShippingTab from './ShippingTab';

const SignUpPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('You must enter a product name')
      .min(5, 'The product name must be at least 5 characters'),
  });

  const routeParams = useParams();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <div className="flex  flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <FormProvider {...methods}>
        <FusePageCarded
          content={
            <>
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab className="h-64" label="Persona natura" />
                  <Tab className="h-64" label="Agente e Immobiliaria" />
                </Tabs>
              </Box>

              <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
                <div className={tabValue !== 0 ? 'hidden' : ''}>
                  <BasicInfoTab />
                </div>

                <div className={tabValue !== 1 ? 'hidden' : ''}>
                  <ShippingTab />
                </div>
              </div>
            </>
          }
        />
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
