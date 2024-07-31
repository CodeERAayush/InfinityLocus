import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function widthPxToDP(width) {
    return (width / 391) * SCREEN_WIDTH;
}

function heightPxToDP(height) {
    return (height / 793) * SCREEN_HEIGHT;
}

export { SCREEN_WIDTH, SCREEN_HEIGHT, widthPxToDP, heightPxToDP };