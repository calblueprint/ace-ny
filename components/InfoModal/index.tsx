import { useState } from 'react';
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

  const [page, setPage] = useState(1);

  return (
    <>
      {page == 1 ? (
        <>
          <InfoModalStyles>
            <InfoModalWrapper>
              <InfoModalText>
                This map was created by the{' '}
                <InfoModalBoldedText>{ACENY}</InfoModalBoldedText> to showcase
                the renewable energy projects being proposed, constructed, and
                operated across New York.
                <br />
                <br />
                The Alliance for Clean Energy New York has compiled this map
                from various public sources and updates it regularly. We make
                our best effort to ensure that all information is accurate and
                up to date, but it&apos;s possible that some of the information
                is inaccurate. If you notice a discrepancy, please email us at{' '}
                <InfoModalBoldedUnderlinedText
                  onClick={() => window.open(`mailto:${email}`)}
                >
                  {email}
                </InfoModalBoldedUnderlinedText>
                , and we will check the information. This map is for
                informational use only.
              </InfoModalText>

              <InfoModalRightArrowStyles onClick={() => setPage(2)}>
                <InfoModalArrow />
              </InfoModalRightArrowStyles>
            </InfoModalWrapper>

            <InfoModalCircleWrapper>
              <InfoModalCircle color={COLORS.electricBlue} />
              <InfoModalCircle color={COLORS.grayBlue} />
            </InfoModalCircleWrapper>
          </InfoModalStyles>
        </>
      ) : (
        <InfoModalStyles>
          <InfoModalWrapper>
            <InfoModalLeftArrowStyles onClick={() => setPage(1)}>
              <InfoModalArrow></InfoModalArrow>
            </InfoModalLeftArrowStyles>

            <InfoModalLegendContent>
              <HeaderStyles>LEGEND</HeaderStyles>

              <TitleStyles>TECHNOLOGY SOURCE</TitleStyles>

              <TechnologyWrapperStyles>
                <TechnologyStyles>
                  <LandBasedWindIcon
                    fill={COLORS.skyBlue}
                    width="9.811px"
                    height="13px"
                  ></LandBasedWindIcon>
                  Land-Based Wind
                </TechnologyStyles>

                <TechnologyStyles>
                  <HydroelectricIcon
                    fill={COLORS.frenchBlue}
                    width="12px"
                    height="9px"
                  ></HydroelectricIcon>
                  Hydroelectric
                </TechnologyStyles>

                <TechnologyStyles>
                  <OffshoreWindIcon
                    fill={COLORS.electricBlue}
                    stroke={COLORS.navy}
                    width="10.547px"
                    height="13px"
                  ></OffshoreWindIcon>
                  Offshore Wind
                </TechnologyStyles>

                <TechnologyStyles>
                  <SolarPvIcon
                    fill={COLORS.solarYellow}
                    width="13.112px"
                    height="13px"
                  ></SolarPvIcon>
                  Solar PV
                </TechnologyStyles>

                <TechnologyStyles>
                  <GeothermalIcon
                    fill={COLORS.earthyGreen}
                    width="11px"
                    height="11px"
                  ></GeothermalIcon>
                  Geothermal
                </TechnologyStyles>
              </TechnologyWrapperStyles>

              <TitleStyles>TECHNOLOGY STORAGE</TitleStyles>

              <TechnologyWrapperStyles>
                <TechnologyStyles>
                  <EnergyStorageIcon
                    fill={COLORS.teal}
                    stroke={COLORS.white}
                    width="12.8px"
                    height="8.4px"
                  ></EnergyStorageIcon>
                  Energy Storage
                </TechnologyStyles>

                <TechnologyStyles>
                  <PumpedStorageIcon
                    fill={COLORS.cyanBlue}
                    width="11.815px"
                    height="10px"
                  ></PumpedStorageIcon>
                  Pumped Storage
                </TechnologyStyles>
              </TechnologyWrapperStyles>
            </InfoModalLegendContent>
          </InfoModalWrapper>

          <InfoModalCircleWrapper>
            <InfoModalCircle color={COLORS.grayBlue} />
            <InfoModalCircle color={COLORS.electricBlue} />
          </InfoModalCircleWrapper>
        </InfoModalStyles>
      )}

      <InfoModalTriangleStyles>
        <InfoModalTriangle />
      </InfoModalTriangleStyles>
    </>
  );
}
