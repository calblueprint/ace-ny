import React from 'react';
import { InfoModalIcon } from '@/assets/InfoModal-Icons/icons';
import { LegendButtonIcon } from '@/assets/Legend-Icons/icons';
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
  InfoModalButtonBackground,
  InfoModalLegendContent,
  InfoModalStyles,
  InfoModalWrapper,
  TechnologyStyles,
  TechnologyWrapperStyles,
  TitleStyles,
} from './styles';

interface InfoModalButtonProps {
  aggFilterisVisible: boolean;
  setAggFilterisVisible: (isVisible: boolean) => void;
  infoModalisVisible: boolean;
  setInfoModalisVisible: (isVisible: boolean) => void;
  legendIsVisible: boolean;
  setLegendIsVisible: (isVisible: boolean) => void;
}

export default function LegendButton({
  aggFilterisVisible,
  setAggFilterisVisible,
  infoModalisVisible,
  setInfoModalisVisible,
  legendIsVisible,
  setLegendIsVisible,
}: InfoModalButtonProps) {
  function handleClick() {
    setLegendIsVisible(!legendIsVisible);
    if (aggFilterisVisible) {
      setAggFilterisVisible(false);
    }
    if (infoModalisVisible) {
      setInfoModalisVisible(false);
    }
  }

  return (
    <>
      {legendIsVisible && (
        <InfoModalStyles>
          <InfoModalWrapper>
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
        </InfoModalStyles>
      )}
      <InfoModalButtonBackground onClick={handleClick}>
        <LegendButtonIcon />
      </InfoModalButtonBackground>
    </>
  );
}
