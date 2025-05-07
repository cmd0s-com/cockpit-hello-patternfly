
import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  CardTitle, 
  PageSection, 
  TextContent, 
  Text, 
  Title, 
  Gallery, 
  GalleryItem,
  Spinner,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';

const Index = () => {
  const [hostname, setHostname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This is a demonstration of how to use cockpit.js
    // In a real project, you would add cockpit as a dependency and import it
    if (window.cockpit) {
      try {
        window.cockpit.file('/etc/hostname').read()
          .then((content: string) => {
            setHostname(content.trim());
            setLoading(false);
          })
          .catch((err: any) => {
            console.error('Error reading hostname:', err);
            setError('Could not read hostname');
            setLoading(false);
          });
      } catch (err) {
        console.error('Error accessing cockpit API:', err);
        setError('Could not access cockpit API');
        setLoading(false);
      }
    } else {
      // For development outside of Cockpit
      setTimeout(() => {
        setHostname('example-hostname');
        setLoading(false);
      }, 1000);
    }
  }, []);

  const runCommand = () => {
    if (window.cockpit) {
      const cmd = window.cockpit.spawn(['uname', '-a']);
      cmd.done((data: string) => {
        alert(`Command output: ${data}`);
      }).fail((ex: any) => {
        console.error('Failed to run command', ex);
        alert(`Failed to run command: ${ex.message}`);
      });
    } else {
      alert('Cockpit API not available in this environment');
    }
  };

  if (loading) {
    return (
      <EmptyState>
        <Spinner size="xl" />
        <Title headingLevel="h2" size="lg">Loading...</Title>
      </EmptyState>
    );
  }

  if (error) {
    return (
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h2" size="lg">Error</Title>
        <EmptyStateBody>{error}</EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">Cockpit Hello World Plugin</Title>
        <Text>Welcome to your Cockpit plugin. This is a simple demonstration of how to create a Cockpit plugin.</Text>
      </TextContent>
      
      <Gallery hasGutter style={{ marginTop: '2rem' }}>
        <GalleryItem>
          <Card>
            <CardTitle>System Information</CardTitle>
            <CardBody>
              <TextContent>
                <Text component="h3">Hostname: {hostname}</Text>
                <Button variant="primary" onClick={runCommand}>
                  Run uname -a
                </Button>
              </TextContent>
            </CardBody>
          </Card>
        </GalleryItem>
        
        <GalleryItem>
          <Card>
            <CardTitle>About This Plugin</CardTitle>
            <CardBody>
              <TextContent>
                <Text>This plugin demonstrates basic integration with Cockpit:</Text>
                <ul>
                  <li>Reading system files</li>
                  <li>Running system commands</li>
                  <li>Using PatternFly 5 components</li>
                </ul>
              </TextContent>
            </CardBody>
          </Card>
        </GalleryItem>
      </Gallery>
    </PageSection>
  );
};

export default Index;
