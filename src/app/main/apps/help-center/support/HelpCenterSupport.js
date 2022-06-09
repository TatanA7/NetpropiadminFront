import { useForm } from 'react-hook-form';
import _ from '@lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Price from './Price';
import PropertyImages from './PropertyImages';
import BasicInformation from './BasicInformation';

const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function HelpCenterSupport() {
  const [currentTab, setCurrentTab] = useState(0);

  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  function onSubmit(data) {
    console.log(data);
  }

  if (_.isEmpty(form)) {
    return null;
  }
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="flex flex-col items-center p-24 sm:p-40 container">
      <div className="flex flex-col w-full max-w-4xl">
        <Button
          className="mx-8"
          variant="contained"
          color="secondary"
          component={NavLinkAdapter}
          to="new/edit"
        >
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="mx-8">Add</span>
        </Button>
        <Tabs
          selectionFollowsFocus
          value={currentTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Información básica" />
          <Tab label="Imágenes de la propiedad" />
          <Tab label="Precio" />
        </Tabs>
        {/* {currentTab === '0' ? <Price /> : <PropertyImages />} */}
        {currentTab === 0 && <BasicInformation />}
        {currentTab === 1 && <PropertyImages />}
        {currentTab === 2 && <Price />}
      </div>
    </div>
  );
}

export default HelpCenterSupport;
