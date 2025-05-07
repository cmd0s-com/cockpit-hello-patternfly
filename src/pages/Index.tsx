
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
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Spinner
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';

const Index = () => {
  const [hostname, setHostname] = useState<string>("unknown");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Component mounted");
    
    // Check if cockpit is available
    if (typeof window.cockpit !== 'undefined') {
      console.log("Cockpit API available");
      try {
        window.cockpit.file('/etc/hostname').read()
          .then((content: string) => {
            console.log("Hostname read:", content);
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
      console.log("Cockpit API not available, using example hostname");
      setTimeout(() => {
        setHostname('example-hostname');
        setLoading(false);
      }, 1000);
    }
  }, []);

  const runCommand = () => {
    if (typeof window.cockpit !== 'undefined') {
      console.log("Running command: uname -a");
      const cmd = window.cockpit.spawn(['uname', '-a']);
      cmd.done((data: string) => {
        console.log("Command output:", data);
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
      
      <Card style={{ marginTop: '2rem' }}>
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
    </PageSection>
  );
};

export default Index;
