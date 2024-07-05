import { useColorScheme } from '@mui/material/styles'
import { InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material'
import { LightMode, DarkMode, Brightness4 } from '@mui/icons-material'


function ModeSelect() {
  const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
  const useStyles = {
    menuitem: { display:'flex', alignItems: 'center', gap: 1 },
    select: {
      color: colorChangeByTheme,
      '.MuiOutlinedInput-notchedOutline': { borderColor: colorChangeByTheme },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colorChangeByTheme },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colorChangeByTheme },
      '.MuiSvg-root': { color: colorChangeByTheme }
    },
    input: {
      color: colorChangeByTheme,
      '&.Mui-focused':{ color: colorChangeByTheme }
    }
  }

  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <FormControl sx={{ color: 'black' }} size='small'>
      <InputLabel
        sx={useStyles.input}
      >
        Mode
      </InputLabel>
      <Select
        value={mode}
        label="Giao diện"
        onChange={handleChange}
        sx={useStyles.select}
      >
        <MenuItem value="light">
          <Box sx={useStyles.menuitem}>
            <LightMode/> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={useStyles.menuitem}>
            <DarkMode/> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={useStyles.menuitem}>
            <Brightness4/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
