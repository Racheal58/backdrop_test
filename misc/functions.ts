import { Dimensions } from "react-native";

export const minifyCats = (items: Cat[]): CatMini[] => {
    const minifiedCats: CatMini[] = [];
    items.map(item => minifiedCats.push({
            name: item.name,
            image: item?.image?.url,
            id: item.id
        })
    );
    return minifiedCats;
}

export const fullHeight = Dimensions.get('window').height;
