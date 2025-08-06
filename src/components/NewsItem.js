import { Box, Image, Text, Button, Badge, VStack, Link, HStack, Spinner } from '@chakra-ui/react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import AIService from '../services/AIService';

export default function NewsItem(props) {
  const { theme } = useTheme();
  const [genZContent, setGenZContent] = useState('');
  const [impactScore, setImpactScore] = useState('');
  const [eli5Content, setEli5Content] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('original'); // 'original', 'genz', 'impact', 'eli5'
  const pixelColors = {
    'dark': '#2c3e50',
    'primary': '#3498db', 
    'success': '#27ae60',
    'danger': '#e74c3c',
    'warning': '#f39c12',
    'info': '#17a2b8',
    'secondary': '#6c757d'
  };

  const getBorderColor = (style) => {
    return pixelColors[style] || '#2c3e50';
  };

  const handleGenZSummarize = async () => {
    if (activeFeature === 'genz') {
      setActiveFeature('original');
      return;
    }

    if (!genZContent) {
      setIsLoading(true);
      setActiveFeature('genz');
      
      try {
        const summary = await AIService.summarizeForGenZ(props.title, props.description);
        setGenZContent(summary);
      } catch (error) {
        setGenZContent('Oops! 🤖 AI summary failed. Try again later!');
      } finally {
        setIsLoading(false);
      }
    } else {
      setActiveFeature('genz');
    }
  };

  const handleImpactScore = async () => {
    if (activeFeature === 'impact') {
      setActiveFeature('original');
      return;
    }

    if (!impactScore) {
      setIsLoading(true);
      setActiveFeature('impact');
      
      try {
        const score = await AIService.getGenZImpactScore(props.title, props.description);
        setImpactScore(score);
      } catch (error) {
        setImpactScore('📊 Impact Score: ?/10\n💡 Why: AI is having a moment 🤖');
      } finally {
        setIsLoading(false);
      }
    } else {
      setActiveFeature('impact');
    }
  };

  const handleELI5 = async () => {
    if (activeFeature === 'eli5') {
      setActiveFeature('original');
      return;
    }

    if (!eli5Content) {
      setIsLoading(true);
      setActiveFeature('eli5');
      
      try {
        const explanation = await AIService.explainLikeImFive(props.title, props.description);
        setEli5Content(explanation);
      } catch (error) {
        setEli5Content('This is like when something complicated happens and even the smart computer gets confused! 🤯');
      } finally {
        setIsLoading(false);
      }
    } else {
      setActiveFeature('eli5');
    }
  };
            
    return (
      <Box
        h="100%"
        bg={theme.cardBg}
        border="4px solid"
        borderColor={theme.border}
        borderRadius="0"
        boxShadow={`8px 8px 0px ${theme.shadow}`}
        position="relative"
        fontFamily="'Courier New', monospace"
        transition="all 0.1s"
        _hover={{
          transform: "translate(-2px, -2px)",
          boxShadow: `10px 10px 0px ${theme.shadow}`
        }}
      >
        {/* Source Badge */}
        <Badge
          position="absolute"
          top="0"
          left="0"
          bg={getBorderColor(props.style)}
          color="white"
          fontSize="xs"
          fontWeight="bold"
          px={2}
          py={1}
          borderRadius="0"
          fontFamily="'Courier New', monospace"
          textTransform="uppercase"
          border="2px solid #000"
          zIndex={2}
        >
          {props.source}
        </Badge>

        {/* Image */}
        <Image
          src={props.imageUrl}
          alt="News"
          w="100%"
          h="200px"
          objectFit="cover"
          filter="contrast(1.2) saturate(1.1)"
          border="2px solid #000"
          borderTop="none"
          borderLeft="none"
          borderRight="none"
        />

        <VStack p={4} align="start" spacing={3}>
          {/* Feature Badge */}
          {activeFeature !== 'original' && (
            <Badge 
              bg={
                activeFeature === 'genz' ? "#ff6b6b" : 
                activeFeature === 'impact' ? "#8b5cf6" : 
                activeFeature === 'eli5' ? "#10b981" : "#6b7280"
              }
              color="white" 
              px={2} 
              py={1} 
              borderRadius="0" 
              border="2px solid #000"
              fontFamily="'Courier New', monospace"
              fontSize="xs"
              textTransform="uppercase"
            >
              {activeFeature === 'genz' && '🤖 AI Gen-Z Mode'}
              {activeFeature === 'impact' && '📊 Impact Score'}
              {activeFeature === 'eli5' && '👶 Explain Like I\'m 5'}
            </Badge>
          )}
          
          {/* Content Area */}
          {isLoading ? (
            <HStack>
              <Spinner size="sm" color={getBorderColor(props.style)} />
              <Text
                fontSize="sm"
                color={theme.text}
                fontFamily="'Courier New', monospace"
              >
                {activeFeature === 'genz' && 'AI is cooking up some fire content... 🔥'}
                {activeFeature === 'impact' && 'AI is calculating impact score... 📊'}
                {activeFeature === 'eli5' && 'AI is thinking of simple words... 🧠'}
              </Text>
            </HStack>
          ) : (
            <>
              {/* Original Content */}
              {activeFeature === 'original' && (
                <>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme.text}
                    lineHeight="1.3"
                    fontFamily="'Courier New', monospace"
                  >
                    {props.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={theme.text}
                    fontFamily="'Courier New', monospace"
                    lineHeight="1.4"
                  >
                    {props.description}
                  </Text>
                </>
              )}

              {/* Gen-Z Content */}
              {activeFeature === 'genz' && genZContent && (() => {
                const lines = genZContent.split('\n').filter(line => line.trim());
                const headlineLine = lines.find(line => line.includes('🔥 Headline:'));
                const summaryLine = lines.find(line => line.includes('📰 Summary:'));
                const whyCareLine = lines.find(line => line.includes('💭 Why care:'));
                
                return (
                  <VStack align="start" spacing={3} w="100%">
                    {headlineLine && (
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color={theme.text}
                        lineHeight="1.3"
                        fontFamily="'Courier New', monospace"
                      >
                        {headlineLine.replace('🔥 Headline:', '').trim()}
                      </Text>
                    )}
                    {summaryLine && (
                      <Text
                        fontSize="sm"
                        color={theme.text}
                        fontFamily="'Courier New', monospace"
                        lineHeight="1.4"
                      >
                        {summaryLine.replace('📰 Summary:', '').trim()}
                      </Text>
                    )}
                    {whyCareLine && (
                      <Text
                        fontSize="xs"
                        color={theme.text}
                        fontFamily="'Courier New', monospace"
                        fontStyle="italic"
                        opacity={0.8}
                        lineHeight="1.3"
                      >
                        💭 {whyCareLine.replace('💭 Why care:', '').trim()}
                      </Text>
                    )}
                  </VStack>
                );
              })()}

              {/* Impact Score Content */}
              {activeFeature === 'impact' && (
                <VStack align="start" spacing={2} w="100%">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme.text}
                    lineHeight="1.3"
                    fontFamily="'Courier New', monospace"
                  >
                    {props.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="white"
                    fontFamily="'Courier New', monospace"
                    lineHeight="1.4"
                    whiteSpace="pre-wrap"
                    bg="#8b5cf6"
                    p={3}
                    border="2px solid #000"
                    borderRadius="0"
                  >
                    {impactScore}
                  </Text>
                </VStack>
              )}

              {/* ELI5 Content */}
              {activeFeature === 'eli5' && (
                <VStack align="start" spacing={2} w="100%">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={theme.text}
                    lineHeight="1.3"
                    fontFamily="'Courier New', monospace"
                  >
                    {props.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="white"
                    fontFamily="'Courier New', monospace"
                    lineHeight="1.4"
                    bg="#10b981"
                    p={3}
                    border="2px solid #000"
                    borderRadius="0"
                  >
                    {eli5Content}
                  </Text>
                </VStack>
              )}
            </>
          )}

          {/* Button Row */}
          <HStack spacing={2} flexWrap="wrap">
            {/* Original Button */}
            <Button
              onClick={() => setActiveFeature('original')}
              size="sm"
              bg={activeFeature === 'original' ? "gray.600" : "gray.400"}
              color="white"
              borderRadius="0"
              border="3px solid #000"
              fontFamily="'Courier New', monospace"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="xs"
              px={3}
              py={3}
              _hover={{
                filter: "brightness(1.1)",
                transform: "translate(1px, 1px)",
              }}
              _active={{
                transform: "translate(2px, 2px)"
              }}
            >
              📰 ORIGINAL
            </Button>

            {/* Gen-Z Button */}
            <Button
              onClick={handleGenZSummarize}
              size="sm"
              bg={activeFeature === 'genz' ? "#ff6b6b" : "#ff8a8a"}
              color="white"
              borderRadius="0"
              border="3px solid #000"
              fontFamily="'Courier New', monospace"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="xs"
              px={3}
              py={3}
              isLoading={isLoading && activeFeature === 'genz'}
              _hover={{
                filter: "brightness(1.1)",
                transform: "translate(1px, 1px)",
              }}
              _active={{
                transform: "translate(2px, 2px)"
              }}
            >
              🤖 GEN-Z
            </Button>

            {/* Impact Score Button */}
            <Button
              onClick={handleImpactScore}
              size="sm"
              bg={activeFeature === 'impact' ? "#8b5cf6" : "#a78bfa"}
              color="white"
              borderRadius="0"
              border="3px solid #000"
              fontFamily="'Courier New', monospace"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="xs"
              px={3}
              py={3}
              isLoading={isLoading && activeFeature === 'impact'}
              _hover={{
                filter: "brightness(1.1)",
                transform: "translate(1px, 1px)",
              }}
              _active={{
                transform: "translate(2px, 2px)"
              }}
            >
              📊 IMPACT
            </Button>

            {/* ELI5 Button */}
            <Button
              onClick={handleELI5}
              size="sm"
              bg={activeFeature === 'eli5' ? "#10b981" : "#34d399"}
              color="white"
              borderRadius="0"
              border="3px solid #000"
              fontFamily="'Courier New', monospace"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="xs"
              px={3}
              py={3}
              isLoading={isLoading && activeFeature === 'eli5'}
              _hover={{
                filter: "brightness(1.1)",
                transform: "translate(1px, 1px)",
              }}
              _active={{
                transform: "translate(2px, 2px)"
              }}
            >
              👶 ELI5
            </Button>

            {/* Read More Button */}
            <Button
              as={Link}
              href={props.newsUrl}
              target="_blank"
              rel="noreferrer"
              size="sm"
              bg="gray.800"
              color="white"
              borderRadius="0"
              border="3px solid #000"
              fontFamily="'Courier New', monospace"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="xs"
              px={4}
              py={3}
              _hover={{
                bg: getBorderColor(props.style),
                transform: "translate(1px, 1px)",
                textDecoration: "none"
              }}
              _active={{
                transform: "translate(2px, 2px)"
              }}
            >
              ▶ READ MORE
            </Button>
          </HStack>
        </VStack>

        {/* Footer */}
        <Box
          borderTop="2px solid #000"
          bg={theme.footerBg}
          p={3}
          textAlign="center"
        >
          <Text
            fontSize="xs"
            color={theme.footerText}
            fontFamily="'Courier New', monospace"
            lineHeight="1.2"
          >
            By: {props.author ? props.author : "UNKNOWN"} | {new Date(props.date).toLocaleDateString()}
          </Text>
        </Box>
      </Box>
    );
  }

