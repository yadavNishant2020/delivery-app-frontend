import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

import { useTheme } from '../../theme';
import { useStyle } from './style';
import { ScrollView } from 'react-native-gesture-handler';
import { scale } from '../../theme/scale';

interface DropdownProps {
    data: Array<string>;
    onSelect: (item: string) => void;
    placeholder?: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({ data, onSelect, placeholder = "Select an item" }) => {
    const theme = useTheme();
    const styles = useStyle(theme);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
        onSelect(item);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={styles.selectedText}>
                    {selectedItem ? selectedItem : placeholder}
                </Text>
                <Image
                    source={isOpen ? require('../../public/arrowIcon.jpg') : require('../../public/arrowIcon.jpg')}
                    style={styles.image}
                />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView horizontal={true} >
                    <View style={styles.dropdownList}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.dropdownText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default CustomDropdown;
