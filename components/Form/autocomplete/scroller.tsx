
import { MenuItem, Stack, styled, Typography, useMediaQuery } from "@mui/material";
import {
  ReactElement,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from "react";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import theme from "../../../theme/theme";

const LISTBOX_PADDING = 8;

const StyledUl = styled("ul")({
  marginBottom: 0,
});

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});
OuterElementType.displayName = "OuterElementType";

export const ListboxComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...otherProps } = props;
  const itemData: ReactElement<any>[] = [];
  (children as ReactElement<any>[]).forEach(
    (item: ReactElement<any> & { children?: ReactElement<any>[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const itemCount = itemData?.length;
  const itemSize = isMobile ? 48 : 36;

  const getChildSize = (child: React.ReactElement<any>) => {
    return itemSize;
  };

  function useResetCache(data: any) {
    const ref = useRef<VariableSizeList>(null);
    useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData?.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    };
    const { key: optionLabel , ...optionProps } = dataSet[0];
    const { name: optionName, iso2: optionIso2} = dataSet[1]; // name and iso2 to be passed by the props
    return (
      <MenuItem
        style={inlineStyle}
        {...optionProps}
        key={optionLabel}
        data-test-id={`li-autocomplete-${optionName}`}
      >
        <Typography noWrap color="secondary" variant="paragraphMd">
          {optionIso2 + ' ' + optionName} 
          {/* here all the fields recieved by the props (name and iso2 for example) to be concatenated */}
        </Typography>
      </MenuItem>
    );
  }

  return (
    <Stack ref={ref}>
      <OuterElementContext.Provider value={otherProps}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType={StyledUl}
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
          style={{
            padding: 0,
          }}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>

    </Stack>
  );
});
