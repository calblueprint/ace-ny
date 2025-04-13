import React, { useState } from 'react';
import {
  InfoModalArrow,
  InfoModalCircle,
  InfoModalTriangle,
} from '@/assets/InfoModal-Icons/icons';
import COLORS from '@/styles/colors';
import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPvIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import {
  HeaderStyles,
  InfoModalBoldedText,
  InfoModalBoldedUnderlinedText,
  InfoModalCircleWrapper,
  InfoModalLeftArrowStyles,
  InfoModalLegendContent,
  InfoModalRightArrowStyles,
  InfoModalStyles,
  InfoModalText,
  InfoModalTriangleStyles,
  InfoModalWrapper,
  TechnologyStyles,
  TechnologyWrapperStyles,
  TitleStyles,
} from './styles';

export default function InfoModal() {
  const ACENY = 'Alliance for Clean Energy New York';
  const email = 'map@aceny.org';

  return (
    <>
      <>
        <InfoModalStyles>
          <InfoModalText>
            This map, created by the{' '}
            <InfoModalBoldedText>{ACENY}</InfoModalBoldedText> highlights
            renewable energy projects proposed, under construction, and in
            operation across New York.
            <p></p>
            The Alliance compiles and updates this map regularly using various
            public sources. While we strive for accuracy, some information may
            be incorrect or outdated. If you spot a discrepancy, please email us
            at{' '}
            <InfoModalBoldedText onClick={() => window.open(`mailto:${email}`)}>
              {email}
            </InfoModalBoldedText>
            , and we will check the information. This map is for informational
            use only.
          </InfoModalText>
        </InfoModalStyles>
      </>
      <InfoModalTriangleStyles>
        <InfoModalTriangle />
      </InfoModalTriangleStyles>
    </>
  );
}
