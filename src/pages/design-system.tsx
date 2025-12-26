import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  DefinitionDescription,
  DefinitionList,
  DefinitionTerm,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Divider,
  Grid,
  Group,
  IconButton,
  Input,
  List,
  ListItem,
  Loading,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavBrand,
  NavLink,
  NavLinks,
  Progress,
  Radio,
  Range,
  Select,
  Snackbar,
  Spinner,
  Switch,
  TabButton,
  TabButtons,
  Table,
  Textarea,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@/elements";

export const DesignSystem = () => {
  return (
    <Layout title="Design System">
      <Container>
        <header style={{ marginBlock: "var(--space-2xl)" }}>
          <h1>Design System</h1>
          <p>
            A comprehensive component library built with custom CSS tokens. All components use semantic HTML and are
            styled using CSS custom properties for colors, typography, spacing, and animations.
          </p>
        </header>

        {/* Table of Contents */}
        <nav style={{ marginBlockEnd: "var(--space-2xl)" }}>
          <h2>Components</h2>
          <Grid>
            <List>
              <ListItem>
                <a href="#typography">Typography</a>
              </ListItem>
              <ListItem>
                <a href="#buttons">Buttons</a>
              </ListItem>
              <ListItem>
                <a href="#cards">Cards</a>
              </ListItem>
              <ListItem>
                <a href="#inputs">Form Inputs</a>
              </ListItem>
              <ListItem>
                <a href="#select">Select</a>
              </ListItem>
              <ListItem>
                <a href="#textarea">Textarea</a>
              </ListItem>
              <ListItem>
                <a href="#form-controls">Form Controls</a>
              </ListItem>
              <ListItem>
                <a href="#range">Range</a>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <a href="#badges">Badges &amp; Chips</a>
              </ListItem>
              <ListItem>
                <a href="#alerts">Alerts</a>
              </ListItem>
              <ListItem>
                <a href="#progress">Progress &amp; Spinners</a>
              </ListItem>
              <ListItem>
                <a href="#avatar">Avatar</a>
              </ListItem>
              <ListItem>
                <a href="#table">Table</a>
              </ListItem>
              <ListItem>
                <a href="#lists">Lists</a>
              </ListItem>
              <ListItem>
                <a href="#definition-list">Definition List</a>
              </ListItem>
              <ListItem>
                <a href="#accordion">Accordion</a>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <a href="#dialog">Dialog</a>
              </ListItem>
              <ListItem>
                <a href="#modal">Modal</a>
              </ListItem>
              <ListItem>
                <a href="#snackbar">Snackbar</a>
              </ListItem>
              <ListItem>
                <a href="#tabs">Tabs</a>
              </ListItem>
              <ListItem>
                <a href="#navigation">Navigation</a>
              </ListItem>
              <ListItem>
                <a href="#layout">Grid &amp; Layout</a>
              </ListItem>
              <ListItem>
                <a href="#divider">Divider</a>
              </ListItem>
            </List>
          </Grid>
        </nav>

        <Divider />

        {/* Typography */}
        <section id="typography">
          <h2>Typography</h2>
          <p>Typography component with semantic variants and fluid sizing.</p>
          <Card>
            <CardBody>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Divider />
              <Typography variant="body1">Body 1 - Primary body text for main content.</Typography>
              <Typography variant="body2">Body 2 - Secondary body text for supporting content.</Typography>
              <Typography variant="caption">Caption - Small text for captions and labels.</Typography>
              <br />
              <Typography variant="overline">Overline - Uppercase label text</Typography>
              <Divider />
              <h4>Rich Text Elements</h4>
              <p>
                This paragraph contains <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <a href="#">links</a>,{" "}
                <code>inline code</code>, <kbd>Cmd</kbd> + <kbd>K</kbd>, and <abbr title="Abbreviation">abbr</abbr>{" "}
                elements.
              </p>
              <blockquote>This is a blockquote for highlighting important quotes or callouts.</blockquote>
              <pre>
                <code>{`const greeting = "Hello, World!";
console.log(greeting);`}</code>
              </pre>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Buttons */}
        <section id="buttons">
          <h2>Buttons</h2>
          <p>
            Button component with variants: <code>primary</code>, <code>secondary</code>, <code>contrast</code>,{" "}
            <code>outline</code>. Sizes: <code>small</code>, <code>medium</code>, <code>large</code>.
          </p>
          <Card>
            <CardBody>
              <h4>Variants</h4>
              <Group>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="contrast">Contrast</Button>
                <Button variant="outline">Outline</Button>
              </Group>

              <h4>Sizes</h4>
              <Group>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </Group>

              <h4>States</h4>
              <Group>
                <Button disabled>Disabled</Button>
              </Group>

              <h4>Button Group</h4>
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>

              <h4>Icon Buttons</h4>
              <Group>
                <IconButton label="Settings" variant="default">
                  ⚙️
                </IconButton>
                <IconButton label="Edit" variant="primary">
                  ✏️
                </IconButton>
                <IconButton label="Delete" variant="secondary">
                  🗑️
                </IconButton>
              </Group>

              <h4>Toggle Button Group</h4>
              <ToggleButtonGroup>
                <ToggleButton value="left" selected>
                  Left
                </ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Cards */}
        <section id="cards">
          <h2>Cards</h2>
          <p>Card component with header, body, and footer sections.</p>
          <Grid>
            <Card>
              <CardHeader>
                <h3>Card Title</h3>
              </CardHeader>
              <CardBody>
                <p>This is the card body content. Cards are great for grouping related information.</p>
              </CardBody>
              <CardFooter>
                <Button variant="outline" size="small">
                  Cancel
                </Button>
                <Button size="small">Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardBody>
                <h4>Simple Card</h4>
                <p>A card with just a body section, no header or footer.</p>
              </CardBody>
            </Card>
          </Grid>
        </section>

        <Divider />

        {/* Form Inputs */}
        <section id="inputs">
          <h2>Form Inputs</h2>
          <p>Text inputs with labels, placeholders, helper text, and validation states.</p>
          <Card>
            <CardBody>
              <Grid>
                <Input name="text" label="Text Input" placeholder="Enter text..." />
                <Input name="email" label="Email" type="email" placeholder="email@example.com" />
              </Grid>
              <Grid>
                <Input name="password" label="Password" type="password" placeholder="Enter password" />
                <Input name="search" label="Search" type="search" placeholder="Search..." />
              </Grid>
              <Grid>
                <Input name="disabled" label="Disabled" disabled value="Disabled input" />
                <Input name="readonly" label="Read Only" readonly value="Read only input" />
              </Grid>
              <Grid>
                <Input name="invalid" label="Invalid" invalid helperText="This field has an error" />
                <Input name="helper" label="With Helper" helperText="This is helper text" />
              </Grid>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Select */}
        <section id="select">
          <h2>Select</h2>
          <p>Dropdown select component with options.</p>
          <Card>
            <CardBody>
              <Grid>
                <Select
                  name="fruit"
                  label="Choose a fruit"
                  placeholder="Select an option..."
                  options={[
                    { value: "apple", label: "Apple" },
                    { value: "banana", label: "Banana" },
                    { value: "orange", label: "Orange" },
                    { value: "grape", label: "Grape", disabled: true },
                  ]}
                />
                <Select
                  name="disabled-select"
                  label="Disabled Select"
                  disabled
                  options={[{ value: "1", label: "Option 1" }]}
                />
              </Grid>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Textarea */}
        <section id="textarea">
          <h2>Textarea</h2>
          <p>Multi-line text input component.</p>
          <Card>
            <CardBody>
              <Grid>
                <Textarea name="message" label="Message" placeholder="Enter your message..." rows={4} />
                <Textarea
                  name="disabled-textarea"
                  label="Disabled Textarea"
                  disabled
                  value="This textarea is disabled"
                />
              </Grid>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Form Controls */}
        <section id="form-controls">
          <h2>Form Controls</h2>
          <p>Checkbox, Radio, and Switch components.</p>
          <Card>
            <CardBody>
              <h4>Checkboxes</h4>
              <Group>
                <Checkbox name="check1" label="Option 1" checked />
                <Checkbox name="check2" label="Option 2" />
                <Checkbox name="check3" label="Disabled" disabled />
              </Group>

              <h4>Radio Buttons</h4>
              <Group>
                <Radio name="radio" value="1" label="Option A" checked />
                <Radio name="radio" value="2" label="Option B" />
                <Radio name="radio" value="3" label="Option C" />
              </Group>

              <h4>Switches</h4>
              <Group>
                <Switch name="switch1" label="Enable notifications" checked />
                <Switch name="switch2" label="Dark mode" />
                <Switch name="switch3" label="Disabled" disabled />
              </Group>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Range */}
        <section id="range">
          <h2>Range</h2>
          <p>Range slider input component.</p>
          <Card>
            <CardBody>
              <Range name="volume" label="Volume" value={50} />
              <Range name="brightness" label="Brightness" min={0} max={100} step={10} value={70} />
              <Range name="disabled-range" label="Disabled" disabled value={30} />
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Badges & Chips */}
        <section id="badges">
          <h2>Badges &amp; Chips</h2>
          <p>Small labels for status indicators and interactive tags.</p>
          <Card>
            <CardBody>
              <h4>Badges</h4>
              <Group>
                <Badge>Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="contrast">Contrast</Badge>
              </Group>

              <h4>Chips</h4>
              <Group>
                <Chip>Default Chip</Chip>
                <Chip variant="primary">Primary</Chip>
                <Chip variant="secondary">Secondary</Chip>
                <Chip removable>Removable</Chip>
              </Group>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Alerts */}
        <section id="alerts">
          <h2>Alerts</h2>
          <p>Notification messages with variants: info, success, warning, error.</p>
          <Card>
            <CardBody>
              <Alert variant="info">This is an informational message.</Alert>
              <Alert variant="success">Operation completed successfully!</Alert>
              <Alert variant="warning">Please review before continuing.</Alert>
              <Alert variant="error">An error occurred. Please try again.</Alert>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Progress & Spinners */}
        <section id="progress">
          <h2>Progress &amp; Spinners</h2>
          <p>Progress bars and loading indicators.</p>
          <Card>
            <CardBody>
              <h4>Progress Bar</h4>
              <Progress value={25} />
              <Progress value={50} />
              <Progress value={75} />
              <Progress />

              <h4>Loading Indicator</h4>
              <Group>
                <Loading />
                <span>Loading...</span>
              </Group>

              <h4>Spinner Sizes</h4>
              <Group>
                <Spinner size="small" />
                <Spinner size="medium" />
                <Spinner size="large" />
              </Group>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Avatar */}
        <section id="avatar">
          <h2>Avatar</h2>
          <p>User avatar component with image or initials fallback.</p>
          <Card>
            <CardBody>
              <h4>Sizes</h4>
              <Group>
                <Avatar initials="SM" size="small" />
                <Avatar initials="MD" size="medium" />
                <Avatar initials="LG" size="large" />
              </Group>

              <h4>With Images</h4>
              <Group>
                <Avatar src="https://i.pravatar.cc/100?img=1" alt="User 1" size="small" />
                <Avatar src="https://i.pravatar.cc/100?img=2" alt="User 2" size="medium" />
                <Avatar src="https://i.pravatar.cc/100?img=3" alt="User 3" size="large" />
              </Group>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Table */}
        <section id="table">
          <h2>Table</h2>
          <p>Data table component with columns and rows.</p>
          <Card>
            <CardBody>
              <Table
                columns={[
                  { key: "name", header: "Name" },
                  { key: "email", header: "Email" },
                  { key: "role", header: "Role" },
                  { key: "status", header: "Status" },
                ]}
                data={[
                  { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
                  { name: "Bob Smith", email: "bob@example.com", role: "User", status: "Active" },
                  { name: "Carol White", email: "carol@example.com", role: "Editor", status: "Pending" },
                  { name: "David Brown", email: "david@example.com", role: "User", status: "Inactive" },
                ]}
              />
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Lists */}
        <section id="lists">
          <h2>Lists</h2>
          <p>Ordered and unordered list components.</p>
          <Card>
            <CardBody>
              <Grid>
                <div>
                  <h4>Unordered List</h4>
                  <List>
                    <ListItem>First item</ListItem>
                    <ListItem>Second item</ListItem>
                    <ListItem>
                      Third item with nested list
                      <List>
                        <ListItem>Nested item 1</ListItem>
                        <ListItem>Nested item 2</ListItem>
                      </List>
                    </ListItem>
                    <ListItem>Fourth item</ListItem>
                  </List>
                </div>
                <div>
                  <h4>Ordered List</h4>
                  <List ordered>
                    <ListItem>First step</ListItem>
                    <ListItem>Second step</ListItem>
                    <ListItem>Third step</ListItem>
                    <ListItem>Fourth step</ListItem>
                  </List>
                </div>
              </Grid>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Definition List */}
        <section id="definition-list">
          <h2>Definition List</h2>
          <p>Term and definition pairs for glossaries and metadata.</p>
          <Card>
            <CardBody>
              <DefinitionList>
                <DefinitionTerm>Name</DefinitionTerm>
                <DefinitionDescription>John Doe</DefinitionDescription>
                <DefinitionTerm>Email</DefinitionTerm>
                <DefinitionDescription>john@example.com</DefinitionDescription>
                <DefinitionTerm>Role</DefinitionTerm>
                <DefinitionDescription>Administrator</DefinitionDescription>
                <DefinitionTerm>Status</DefinitionTerm>
                <DefinitionDescription>Active</DefinitionDescription>
              </DefinitionList>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Accordion */}
        <section id="accordion">
          <h2>Accordion</h2>
          <p>Collapsible content sections using native details/summary elements.</p>
          <Card>
            <CardBody>
              <Accordion>
                <AccordionItem summary="What is this design system?" open>
                  <p>
                    This is a custom design system built with CSS custom properties (tokens) for colors, typography,
                    spacing, and animations. All components use semantic HTML.
                  </p>
                </AccordionItem>
                <AccordionItem summary="How do I customize the colors?">
                  <p>
                    Override the CSS custom properties in <code>_colors.css</code>. The system uses OKLCH color space
                    for perceptually uniform colors that are easy to manipulate.
                  </p>
                </AccordionItem>
                <AccordionItem summary="Is dark mode supported?">
                  <p>
                    Yes! Add <code>data-theme="dark"</code> to the root element to enable dark mode. All color tokens
                    have dark mode variants defined.
                  </p>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Dialog */}
        <section id="dialog">
          <h2>Dialog</h2>
          <p>Native dialog element for confirmations and forms.</p>
          <Card>
            <CardBody>
              <Button onclick="document.getElementById('demo-dialog').showModal()">Open Dialog</Button>
              <Dialog id="demo-dialog">
                <DialogHeader>
                  <h3>Confirm Action</h3>
                </DialogHeader>
                <DialogBody>
                  <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
                </DialogBody>
                <DialogFooter>
                  <Button variant="outline" onclick="document.getElementById('demo-dialog').close()">
                    Cancel
                  </Button>
                  <Button onclick="document.getElementById('demo-dialog').close()">Confirm</Button>
                </DialogFooter>
              </Dialog>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Modal */}
        <section id="modal">
          <h2>Modal</h2>
          <p>Modal overlay component (shares styling with Dialog).</p>
          <Card>
            <CardBody>
              <Button onclick="document.getElementById('demo-modal').showModal()">Open Modal</Button>
              <Modal id="demo-modal">
                <ModalHeader>
                  <h3>Modal Title</h3>
                </ModalHeader>
                <ModalBody>
                  <p>
                    This is a modal dialog. You can put any content here including forms, images, or other components.
                  </p>
                  <Input name="modal-input" label="Example Input" placeholder="Type something..." />
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" onclick="document.getElementById('demo-modal').close()">
                    Cancel
                  </Button>
                  <Button onclick="document.getElementById('demo-modal').close()">Save</Button>
                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Snackbar */}
        <section id="snackbar">
          <h2>Snackbar</h2>
          <p>Toast notification component for brief messages.</p>
          <Card>
            <CardBody>
              <p>
                <small>
                  Note: Snackbars are positioned fixed at the bottom of the viewport when displayed. The example below
                  shows the snackbar inline for demonstration.
                </small>
              </p>
              <div style={{ position: "relative", height: "4rem" }}>
                <Snackbar variant="info" open>
                  This is an info snackbar
                </Snackbar>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Tabs */}
        <section id="tabs">
          <h2>Tabs</h2>
          <p>Tab navigation component for switching between views.</p>
          <Card>
            <CardBody>
              <TabButtons>
                <TabButton active>Overview</TabButton>
                <TabButton>Details</TabButton>
                <TabButton>Settings</TabButton>
                <TabButton disabled>Disabled</TabButton>
              </TabButtons>
              <div style={{ padding: "var(--space-lg)" }}>
                <p>Tab content would appear here based on the selected tab.</p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Navigation */}
        <section id="navigation">
          <h2>Navigation</h2>
          <p>Navigation bar component with brand and links.</p>
          <Card>
            <CardBody>
              <Nav>
                <NavBrand href="/">MyApp</NavBrand>
                <NavLinks>
                  <NavLink href="/" active>
                    Home
                  </NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                </NavLinks>
              </Nav>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Grid & Layout */}
        <section id="layout">
          <h2>Grid &amp; Layout</h2>
          <p>Layout utilities for organizing content.</p>
          <Card>
            <CardBody>
              <h4>Grid (Auto-fit columns)</h4>
              <Grid>
                <Card>
                  <CardBody>Column 1</CardBody>
                </Card>
                <Card>
                  <CardBody>Column 2</CardBody>
                </Card>
                <Card>
                  <CardBody>Column 3</CardBody>
                </Card>
              </Grid>

              <h4>Group (Inline flex)</h4>
              <Group>
                <Badge>Tag 1</Badge>
                <Badge variant="secondary">Tag 2</Badge>
                <Badge variant="contrast">Tag 3</Badge>
              </Group>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Divider */}
        <section id="divider">
          <h2>Divider</h2>
          <p>Horizontal and vertical dividers for separating content.</p>
          <Card>
            <CardBody>
              <h4>Horizontal Divider</h4>
              <p>Content above the divider.</p>
              <Divider />
              <p>Content below the divider.</p>

              <h4>Vertical Divider</h4>
              <div style={{ display: "flex", alignItems: "center", height: "3rem" }}>
                <span>Left</span>
                <Divider orientation="vertical" />
                <span>Right</span>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Design Tokens */}
        <section id="tokens">
          <h2>Design Tokens</h2>
          <p>The design system is built on CSS custom properties organized into these categories:</p>
          <Grid>
            <Card>
              <CardHeader>
                <h4>Colors</h4>
              </CardHeader>
              <CardBody>
                <code>_colors.css</code>
                <p>
                  Primary, secondary, accent, semantic colors (success, warning, error, info), and neutral colors using
                  OKLCH color space.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h4>Typography</h4>
              </CardHeader>
              <CardBody>
                <code>_typography.css</code>
                <p>Font families, fluid font sizes, font weights, line heights, letter spacing, and prose widths.</p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h4>Box Model</h4>
              </CardHeader>
              <CardBody>
                <code>_box.css</code>
                <p>Spacing scale, border widths/radii, shadows, z-index layers, max-widths, and aspect ratios.</p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h4>Animation</h4>
              </CardHeader>
              <CardBody>
                <code>_animation.css</code>
                <p>Durations, easing curves, and keyframe animations with reduced motion support.</p>
              </CardBody>
            </Card>
          </Grid>
        </section>

        <footer style={{ marginBlock: "var(--space-2xl)", textAlign: "center" }}>
          <Typography variant="caption">Built with semantic HTML and CSS custom properties</Typography>
        </footer>
      </Container>
    </Layout>
  );
};
