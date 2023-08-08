import {
    Box,
    List,
    ListItem,
    Paper,
    Typography,
} from '@mui/material'

import type { Category as CategoryT } from '../../../../types/Category'
import type { Matcher as MatcherT } from '../../../../types/Matcher'

import AddMatcher from '../AddMatcher/'
import Colour from '../Colour/'
import Description from '../Description/'
import Matcher from '../Matcher/'
import Title from '../Title/'

interface Props {
    category: CategoryT
}

const Category = ({ category }: Props) => {
    return (
        <ListItem
            sx={{
                ' .Category_AddMatcher': {
                    opacity: '0',
                },
                '&:hover .Category_AddMatcher': {
                    opacity: '1',
                },
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: '20px 50px',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Colour category={category} />
                    <Title category={category} />
                </Box>
                <Description category={category} />
                <Typography
                    variant='h4'
                    align='left'
                    sx={{ fontSize: '16px', fontWeight: 'bold' }}
                >
                    Matches
                </Typography>
                <List>
                    {category.matchers.map((matcher: MatcherT) => (
                        <Matcher
                            categoryId={category.id}
                            key={matcher.id}
                            matcher={matcher}
                        />
                    ))}
                    <AddMatcher categoryId={category.id} />
                </List>
            </Paper>
        </ListItem>
    )
}

export default Category
