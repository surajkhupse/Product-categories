/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface sideNavProps {
  categoryList: string[];
  products: any[];
  onSelectValue: (data: string) => any;
  onClearFilters : () => any;
  onRunReport: (category: string, selectedProduct: any[]) => any;
  reportRun : any
}

const SideNav = (props: sideNavProps) => {
  console.log("product", props.products);

  const [productName, setProductName] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [isRunningReport, setIsRunningReport] = React.useState(false);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const updatedProductNames = typeof value === "string" ? value.split(",") : value;
    setProductName(updatedProductNames);
    props.onSelectValue && props.onSelectValue(updatedProductNames);
  };

  const clearFilter = () => {
    setProductName([]);
    setSelectedCategory("");
    props.onClearFilters(); 
  }

  const handleCategoryChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setProductName([]); 
   };

  // const filteredProducts = selectedCategory
  //   ? props.products.filter((product) => product.category === selectedCategory)
  //   : props.products;

  const filteredProducts = selectedCategory
  ? props.products.filter((product) =>
      product.category === selectedCategory && (productName.length === 0 || productName.includes(product.title))
    )
  : props.products;


  const habdleBugReport = () => {
    debugger
    setIsRunningReport(true);
    const selectedProducts = productName.length > 0 
    ? props.products.filter(product => productName.includes(product.title))
    : props.products.filter(product => product.category === selectedCategory);
    props.onRunReport && props.onRunReport(selectedCategory, selectedProducts);
      setTimeout(() => {
        setIsRunningReport(false);
      }, 3000);
  };




  return (
    <>
      <div className="d-flex justify-content-between mt-3 mb-5">
        <Typography variant="h5" gutterBottom>
          Filters
        </Typography>
        <Button color="inherit" size="small" onClick={clearFilter}>
          Clear
        </Button>
      </div>
      <div className="mb-4">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {Array.isArray(props.categoryList) &&
                props.categoryList?.map((category: any, index: any) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">
              Select Product
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={productName}
              onChange={handleChange}
              input={<OutlinedInput label="Select product" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              disabled={!selectedCategory}
            >
              {Array.isArray(filteredProducts) &&
                filteredProducts?.map((product) => (
                  <MenuItem key={product.id} value={product.title}>
                    <Checkbox checked={productName.includes(product.title)} />
                    <ListItemText primary={product.title} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="bottom-0 ms-3 ms-lg-5 ms-md-3 ms-sm-3 position-absolute">
        <Button variant="contained" size="large" onClick={habdleBugReport} disabled={!selectedCategory || props.reportRun || isRunningReport} >
          {isRunningReport ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={24} color="inherit" />
              <span style={{ marginLeft: '8px' }}>Running...</span>
            </Box>
          ) : (
            'Run Report'
          )}
        </Button>
      </div>
    </>
  );
};

export default SideNav;
