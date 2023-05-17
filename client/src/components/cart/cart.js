import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import CartItem from './cartItem';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.primary.main}`,
        padding: '0 4px',
    },
}));

export default function Cart(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const openCart = (event) => {
        if (cartSize > 0) setAnchorEl(event.currentTarget);
    };
    const closeCart = () => {
        setAnchorEl(null);
    };

    const cartFunctions = props.cartFunctions;
    const cartData = props.cartData;
    const cartSize = cartFunctions.getCartSize();

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={openCart}
                sx={{ color: 'white' }} aria-label="cart">
                <StyledBadge badgeContent={cartSize} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeCart}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: {
                        width: 450,
                    },
                }}
            >
                {cartData.map(block =>
                    <CartItem
                        key={block.id}
                        item={block}
                        cartSize={cartSize}
                        cartFunctions={cartFunctions}
                        closeCart={closeCart} />)}

                <MenuItem disableRipple style={{ cursor: 'default' }}>
                    <ListItemText><b>Total</b></ListItemText>
                    <span>&nbsp;&nbsp;</span>
                    <Typography color="text.primary">
                        ${cartFunctions.getCartTotal()}.00
                    </Typography>
                </MenuItem>

                <MenuItem disableRipple style={{ cursor: 'default' }}>
                    <Button component={Link} to={'/cart'} onClick={closeCart} variant="contained">View Cart</Button>
                </MenuItem>
            </Menu>
        </div>

    )
}
