import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, HStack, IconButton, useDisclosure, CollapsibleRoot, CollapsibleContent, VStack, Button } from '@chakra-ui/react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { theme, isDark, toggleTheme } = useTheme();

  const pixelColors = {
    'business': '#2c3e50',
    'health': '#27ae60', 
    'entertainment': '#3498db',
    'science': '#e74c3c',
    'sports': '#17a2b8',
    'technology': '#6c757d'
  };

  const NavLink = ({ to, color, children }) => (
    <Link
      as={RouterLink}
      to={to}
      fontFamily="'Courier New', monospace"
      fontWeight="bold"
      textTransform="uppercase"
      fontSize="sm"
      color="white"
      bg={color}
      px={4}
      py={2}
      border="2px solid #000"
      borderRadius="0"
      textDecoration="none"
      letterSpacing="1px"
      transition="all 0.1s"
      _hover={{
        transform: "translate(-2px, -2px)",
        boxShadow: "4px 4px 0px #000",
        textDecoration: "none",
        bg: color,
        filter: "brightness(1.1)"
      }}
      _active={{
        transform: "translate(0px, 0px)",
        boxShadow: "2px 2px 0px #000"
      }}
    >
      ▶ {children}
    </Link>
  );

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg={theme.navbarBg}
      border="4px solid"
      borderColor={theme.border}
      borderTop="none"
      boxShadow="0 4px 0px #000"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link
          as={RouterLink}
          to="/"
          display="flex"
          alignItems="center"
          fontFamily="'Courier New', monospace"
          fontWeight="bold"
          fontSize="xl"
          color="white"
          textDecoration="none"
          bg="red.500"
          px={4}
          py={2}
          border="3px solid #000"
          borderRadius="0"
          textTransform="uppercase"
          letterSpacing="2px"
          _hover={{
            transform: "translate(-1px, -1px)",
            boxShadow: "3px 3px 0px #000",
            textDecoration: "none"
          }}
        >
          GenZ.News
        </Link>

        {/* Theme Toggle */}
        <Button
          onClick={toggleTheme}
          bg={isDark ? "#f39c12" : "#2c3e50"}
          color="white"
          border="3px solid #000"
          borderRadius="0"
          fontFamily="'Courier New', monospace"
          fontWeight="bold"
          fontSize="sm"
          px={4}
          py={2}
          textTransform="uppercase"
          letterSpacing="1px"
          _hover={{
            transform: "translate(-1px, -1px)",
            boxShadow: "3px 3px 0px #000",
            filter: "brightness(1.1)"
          }}
          _active={{
            transform: "translate(1px, 1px)",
            boxShadow: "1px 1px 0px #000"
          }}
        >
          {isDark ? "☀ LIGHT" : "🌙 DARK"}
        </Button>

        {/* Desktop Navigation */}
        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          <NavLink to="/business" color={pixelColors.business}>Business</NavLink>
          <NavLink to="/health" color={pixelColors.health}>Health</NavLink>
          <NavLink to="/entertainment" color={pixelColors.entertainment}>Entertainment</NavLink>
          <NavLink to="/science" color={pixelColors.science}>Science</NavLink>
          <NavLink to="/sports" color={pixelColors.sports}>Sports</NavLink>
          <NavLink to="/technology" color={pixelColors.technology}>Technology</NavLink>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          aria-label="Toggle Navigation"
          bg="white"
          color="gray.800"
          border="2px solid #000"
          borderRadius="0"
          fontFamily="'Courier New', monospace"
          fontSize="lg"
          fontWeight="bold"
          _hover={{
            bg: "gray.200",
            transform: "translate(-1px, -1px)",
            boxShadow: "2px 2px 0px #000"
          }}
        >
          {isOpen ? "✕" : "☰"}
        </IconButton>
      </Flex>

      {/* Mobile Navigation */}
      <CollapsibleRoot open={isOpen}>
        <CollapsibleContent>
          <Box
            pb={4}
            px={4}
            bg={isDark ? "#0f1419" : "gray.700"}
            borderTop="2px solid #000"
            display={{ md: 'none' }}
          >
            <VStack spacing={2} align="stretch">
              <Button
                onClick={toggleTheme}
                bg={isDark ? "#f39c12" : "#2c3e50"}
                color="white"
                border="2px solid #000"
                borderRadius="0"
                fontFamily="'Courier New', monospace"
                fontWeight="bold"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="1px"
                _hover={{
                  transform: "translate(-1px, -1px)",
                  boxShadow: "2px 2px 0px #000",
                  filter: "brightness(1.1)"
                }}
              >
                {isDark ? "☀ LIGHT MODE" : "🌙 DARK MODE"}
              </Button>
              <NavLink to="/business" color={pixelColors.business}>Business</NavLink>
              <NavLink to="/health" color={pixelColors.health}>Health</NavLink>
              <NavLink to="/entertainment" color={pixelColors.entertainment}>Entertainment</NavLink>
              <NavLink to="/science" color={pixelColors.science}>Science</NavLink>
              <NavLink to="/sports" color={pixelColors.sports}>Sports</NavLink>
              <NavLink to="/technology" color={pixelColors.technology}>Technology</NavLink>
            </VStack>
          </Box>
        </CollapsibleContent>
      </CollapsibleRoot>
    </Box>
  );
}
