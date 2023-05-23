import { Backdrop, CircularProgress } from "@mui/material"

export default function ProductsLoading({open}) {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={() => { }}  //do nothing
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}