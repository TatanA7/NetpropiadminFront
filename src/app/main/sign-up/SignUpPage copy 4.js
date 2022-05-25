import FusePageCarded from '@fuse/core/FusePageCarded';
import { FormControlLabel, Switch, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
    <div>
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
                  <Tab className="h-64" label="Basic Info" />
                  <Tab className="h-64" label="Shipping" />
                </Tabs>
              </Box>

              <div className="p-16 sm:p-24 max-w-3xl">
                <div className={tabValue !== 0 ? 'hidden' : ''}>
                  <BasicInfoTab />
                </div>

                <div className={tabValue !== 4 ? 'hidden' : ''}>
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
