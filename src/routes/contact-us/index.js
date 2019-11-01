import React from 'react'
import Layout from 'components/Layout'
import ContactUs from './ContactUs'

export default props => {
  return {
    title: 'Свяжитесь с нами',
    component: (
      <Layout {...props}>
        <ContactUs />
      </Layout>
    )
  }
}
