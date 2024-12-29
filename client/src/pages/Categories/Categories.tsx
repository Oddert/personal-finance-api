import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    Typography,
} from '@mui/material'
import { Add as PlusIcon } from '@mui/icons-material'

import { Category as CategoryT, ICategoryLayoutModes } from '../../types/Category'

import { getCategoryResponse } from '../../redux/selectors/categorySelectors'

import Category from '../../components/Category/'
import CategoryAdd from '../../components/CategoryAdd/'
import LayoutControls from './components/LayoutControls'

const Categories = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [layout, setLayout] = useState<ICategoryLayoutModes>('standard')

    const categories = useSelector(getCategoryResponse)

    const handleDialogClose = useCallback(() => setDialogOpen(false), [])
    const handleDialogOpen = useCallback(() => setDialogOpen(true), [])
    return (
        <Container
            sx={(theme) => ({
                transition: '.2s linear',
                [theme.breakpoints.down('sm')]: {
                    padding: '4px',
                }
            })}
        >
            <Typography variant='h2' sx={{ margin: '32px 0' }}>
                Categories
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 8px',
                }}
            >
                <LayoutControls layout={layout} setLayout={setLayout} />
                <Button onClick={handleDialogOpen} variant='contained'>
                    <PlusIcon /> Add Category
                </Button>
            </Box>
            <List
                sx={(theme) => layout === 'list' ? ({
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.down('sm')]: {
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gridGap: '10px',
                    }
                }) : layout === 'compact' ? ({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    alignItems: 'start',
                    gridGap: '4px',
                    [theme.breakpoints.down('sm')]: {
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gridGap: '10px',
                    }
                }) : ({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    alignItems: 'start',
                    gridGap: '16px',
                    [theme.breakpoints.down('sm')]: {
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gridGap: '10px',
                    }
                })}
            >
                {categories.map((category: CategoryT) => (
                    <Category
                        category={category}
                        key={category.id}
                        layout={layout}
                    />
                ))}
                <ListItem>
                    <Button
                        onClick={handleDialogOpen}
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                        variant='outlined'
                    >
                        <PlusIcon fontSize='large' />
                    </Button>
                </ListItem>
            </List>
            <CategoryAdd
                handleClose={handleDialogClose}
                open={dialogOpen}
            />
        </Container>
    )
}

export default Categories
