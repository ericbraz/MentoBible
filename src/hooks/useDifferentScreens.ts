import useWindowDimensions from './useWindowDimensions'

export default function useDifferentScreens(customValue?: number) {
   const screenWidth = useWindowDimensions().width

   const smallScreen = 550 // --max-mobile-screen: 550px;
   const largeScreen = 840 // --max-tablet-screen: 840px;

   const mobileScreen = screenWidth <= smallScreen
   const tabletScreen = screenWidth > smallScreen && screenWidth <= largeScreen
   const desktopScreen = screenWidth > largeScreen

   const smallerScreens = mobileScreen || tabletScreen

   const customScreen = customValue ?? 0
   const biggerThanCustomScreen = screenWidth > customScreen

   return { smallerScreens, mobileScreen, tabletScreen, desktopScreen, biggerThanCustomScreen }
}
