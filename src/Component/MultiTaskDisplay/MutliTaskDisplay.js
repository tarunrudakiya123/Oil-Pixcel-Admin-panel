import { useRef } from "react"
import DashBoardScreen from "../../Screens/DashBoard/DashBoardScreen"
import ManageUser from "../../Screens/User/ManageUser"
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Product from "../../Screens/Product/ProductScreen"
import { useState } from "react"
import UserData from "../../Screens/User/UserData"

export default function MultiTaskDisplay() {
    const ref = useRef()
    const [path, setpath] = useState()

    return <>

            <FormControl  variant="filled" sx={{ m: 1, minWidth: 300  , zIndex:10000000000000}}>
                <InputLabel id="demo-simple-select-filled-label">Select Screen </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={(e) => setpath(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'/'}>DashBoardScreen</MenuItem>
                    <MenuItem value={'/product'}>ProductScreen</MenuItem>
                    <MenuItem value={'/user'}>UserScreen</MenuItem>
                </Select>
            </FormControl>

            {
                path == '/' ? <DashBoardScreen /> : path == '/product' ? <Product /> : path == '/user' ? <UserData /> : ""
            }
    </>
}