import { Box, Button, CheckIcon, Combobox, Group, Pill, ScrollArea, Text, Tooltip, useCombobox } from "@mantine/core";
import { CaretDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import FormMessage from "../../../../components/Common/Errors/FormMessage";
import { DropdownData } from "../../../../services/Api";
import { ColorResponse } from "../../../../services/requests/Pets/types";
import { FilterType } from "./types";

interface ButtonMultiSelectProps {
  filterCategory: FilterType;
  data: DropdownData[];
  placeholder: string;
  selectedFilters: DropdownData[];
  disabled: boolean;
  disabledText?: string;
  searchParams: URLSearchParams;
  queryStringText?: string;
  colors: ColorResponse[];
  isSpeciesSelected: boolean;
  searchPlaceholder?: string;
  handleSelectFilter: (filterApplied: FilterType, filteredValues: DropdownData[]) => void;
}

export default function ButtonMultiSelect({
  filterCategory,
  data,
  placeholder,
  selectedFilters,
  disabled,
  disabledText,
  queryStringText,
  searchParams,
  colors,
  isSpeciesSelected,
  searchPlaceholder,
  handleSelectFilter,
}: Readonly<ButtonMultiSelectProps>) {
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
    },
  });

  const options = data
    .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item.value} key={item.label}>
        <Group>
          <Text>{selectedFilters.includes(item) && <CheckIcon size={12} />}</Text>
          <div className="flex items-center gap-2.5">
            {filterCategory === FilterType.Color && (
              <div
                className="w-5 h-5 rounded-full border border-gray-500"
                style={{ backgroundColor: colors.find((c) => c.id.toString() === item.value)?.hexCode }}
              />
            )}
            <Text>{item.label}</Text>
          </div>
        </Group>
      </Combobox.Option>
    ));

  const removeSelectedItem = (selectedItem: DropdownData) => {
    const updatedItems = selectedFilters.filter((item) => item.label !== selectedItem.label);
    handleSelectFilter(filterCategory, updatedItems);
  };

  const alreadyHasFilterApplied = (newFilter: DropdownData) => {
    return selectedFilters.find((filter) => filter.value === newFilter.value);
  };

  const handleSelectItem = (value: string) => {
    const selectedValue = data.find((filter) => filter.value === value);
    if (!selectedValue) {
      return;
    }
    if (alreadyHasFilterApplied(selectedValue)) {
      const filtersWithDuplicateRemoved = selectedFilters.filter((filter) => filter.value !== selectedValue.value);
      handleSelectFilter(filterCategory, filtersWithDuplicateRemoved);
    } else {
      handleSelectFilter(filterCategory, [...selectedFilters, selectedValue]);
    }

    if (filterCategory === FilterType.Species) {
      combobox.closeDropdown();
    }
  };

  useEffect(() => {
    if (queryStringText) {
      const queryValues = searchParams.getAll(queryStringText);
      const initialSelectedFilters = data.filter((item) => queryValues.includes(item.value));
      if (
        initialSelectedFilters.length > 0 &&
        JSON.stringify(initialSelectedFilters) !== JSON.stringify(selectedFilters)
      ) {
        handleSelectFilter(filterCategory, initialSelectedFilters);
      }
    }
  }, [searchParams, queryStringText]);

  return (
    <div className="w-full">
      <Combobox
        store={combobox}
        position="bottom-start"
        withArrow
        withinPortal={false}
        positionDependencies={[selectedFilters]}
        onOptionSubmit={(val) => handleSelectItem(val)}
        classNames={{
          dropdown: "shadow-md",
        }}
      >
        <Combobox.Target>
          {disabled ? (
            <Tooltip label={disabledText}>
              <Button
                onClick={() => combobox.toggleDropdown()}
                variant="outline"
                disabled={disabled}
                rightSection={
                  <CaretDown
                    size={12}
                    weight="fill"
                    className={`transition duration-300 ${combobox.dropdownOpened ? "rotate-180" : ""}`}
                  />
                }
                className="text-[var(--primary-text-color)] uppercase w-full tracking-wider"
              >
                {placeholder}
              </Button>
            </Tooltip>
          ) : (
            <Button
              onClick={() => combobox.toggleDropdown()}
              variant="outline"
              disabled={disabled}
              rightSection={
                <CaretDown
                  size={12}
                  weight="fill"
                  className={`transition duration-300 ${combobox.dropdownOpened ? "rotate-180" : ""}`}
                />
              }
              className="text-[var(--primary-text-color)] uppercase w-full tracking-wider"
            >
              {placeholder}
            </Button>
          )}
        </Combobox.Target>
        <Combobox.Dropdown style={{ maxWidth: "300px" }}>
          {searchPlaceholder && (
            <Combobox.Search
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder={searchPlaceholder}
            />
          )}
          <ScrollArea.Autosize type="scroll" mah={200}>
            <Combobox.Options>{options}</Combobox.Options>
          </ScrollArea.Autosize>
        </Combobox.Dropdown>
        {!isSpeciesSelected && filterCategory === FilterType.Species && (
          <div className="mt-3">
            <FormMessage
              type="warning"
              message="Selecione a espécie para poder filtrar pela raça"
              icon={false}
              className="m-0"
            />
          </div>
        )}
      </Combobox>

      {selectedFilters.length > 0 && (
        <Box display="flex" className="gap-2 flex-wrap mt-2">
          {selectedFilters.map((item) => (
            <Pill
              withRemoveButton
              key={item.value}
              className="bg-white text-[var(--primary-text-color)] outline outline-[1.5px] 
                outline-[var(--primary-purple)]"
              onRemove={() => removeSelectedItem(item)}
            >
              {item.label}
            </Pill>
          ))}
        </Box>
      )}
    </div>
  );
}
