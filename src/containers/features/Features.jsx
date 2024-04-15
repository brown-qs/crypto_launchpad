import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Off-Balance Sheet Lending',
    text: 'When structured properly, selective receivables finance stays off a company’s balance sheet. It has no impact on outstanding loans or future requirements for lines of credit and similar funding.',
  },
  {
    title: 'Flexibility of Participation',
    text: 'Selective receivables finance allows companies to participate only when needed. This helps businesses facing seasonal demand or during periods of economic volatility.',
  },
  {
    title: 'Access funding via Crowdsource mechanism',
    text: 'Unlike other options, selective receivables finance allows companies to incorporate multiple funders into a program. This reduces the risks inherent in relying on a single financial institution.',
  },
  {
    title: 'More Favorable Pricing',
    text: 'By incorporating multiple funding sources, selective receivables finance enables price competition.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">Receivables / Invoice Finance</h1>
      <p>The most secured form of trade finance where open account trade invoices are secured by insurance and assigned to a platform for collection when due. It provides early liquidity to exporters and a secured short-term liquid asset to investors/lenders.</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
