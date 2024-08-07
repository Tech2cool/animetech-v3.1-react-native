import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Theme from '../utils/Theme';
interface paginationProp {
  pages: {
    page_link: string;
    page: number;
    name: string;
    is_current: boolean;
  }[];
  onPressPage: (page: number) => void;
}
const color = Theme.DARK;
const font = Theme.FONTS;
const Pagination: React.FC<paginationProp> = ({pages, onPressPage}) => {
  return (
    <View style={styles.container}>
      {pages?.map(page => (
        <TouchableOpacity
          onPress={() => onPressPage(page?.page)}
          key={page?.name}
          style={[
            styles.PageBtn,
            page?.is_current ? styles.PageBtnActive : undefined,
          ]}>
          <Text style={styles.pageNumText}>{page?.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 30,
  },
  PageBtn: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 99,
    minWidth: 45,
    minHeight: 45,
    borderColor: color.Orange,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PageBtnActive: {
    backgroundColor: color.Orange,
  },
  pageNumText: {
    color: color.White,
    fontFamily: font.OpenSansBold,
    fontSize: 14,
  },
});
