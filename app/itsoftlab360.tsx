// import React from "react";
//test
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   Building2,
//   Smartphone,
//   Globe,
//   BrainCircuit,
//   Boxes,
//   ShieldCheck,
//   Users,
// } from "lucide-react-native";
// import { Stack } from "expo-router";

// const services = [
//   {
//     icon: <Boxes color="#2563EB" size={28} />,
//     title: "Enterprise Software",
//     desc: "ERP, CRM, HRMS, POS & Business Solutions",
//   },
//   {
//     icon: <Globe color="#2563EB" size={28} />,
//     title: "Web Development",
//     desc: "Modern websites & enterprise portals",
//   },
//   {
//     icon: <Smartphone color="#2563EB" size={28} />,
//     title: "Mobile Apps",
//     desc: "Android & iOS applications",
//   },
//   {
//     icon: <BrainCircuit color="#2563EB" size={28} />,
//     title: "AI & Automation",
//     desc: "AI assistants & workflow automation",
//   },
// ];

// const industries = [
//   "Healthcare",
//   "Manufacturing",
//   "Retail",
//   "Education",
//   "Banking",
//   "Hospitality",
//   "Construction",
//   "Logistics",
// ];

// const productList = [
//     "HRMSM (Human Resource Management SysteM)",
//     "ERP (Enterprise Resource Planning)",
//     "CRM (Customer Relationship Management)",
//     "POS (Point Of Sales)",
//     "QMS (Queue Management System)",
//     "AI Automation",
//     "SFA (Sales Force Automation)",
//     "Supply Chain & Logistic",
//     "VMS (Vendor Management System)",
//     "LMS Learning Management System)",
//     "DoMS (Document Management System)",
//     "DMS (Dealer Management System)",
// ]

// export default function Home() {
//   return (
//     <SafeAreaView style={[styles.safe]}>
//     <>
//     <Stack.Screen
            
//             options={{
//                 title: "ITSOFTLAB360",
//             }}
//         />
//       <StatusBar barStyle="light-content" />

//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* HERO */}

//         <LinearGradient
//           colors={["#0F172A", "#1E3A8A"]}
//           style={styles.hero}
//         >
//           <Text style={styles.title}>
//             Transforming Businesses with Smart Technology
//           </Text>

//           <Text style={styles.subtitle}>
//             ITSoftLab360 builds enterprise software, mobile apps,
//             AI-powered automation, and custom digital solutions
//             that help businesses grow faster.
//           </Text>

//           {/* <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Explore Solutions</Text>
//             <ChevronRight color="white" size={18} />
//           </TouchableOpacity> */}
//         </LinearGradient>

//         {/* ABOUT */}

//         <View style={styles.section}>
//           <Text style={styles.heading}>
//             What is ITSoftLab360?
//           </Text>

//           <Text style={styles.paragraph}>
//             ITSoftLab360 is a software development company helping
//             startups, SMEs, and enterprises accelerate digital
//             transformation through custom software, enterprise
//             applications, AI automation, and cloud technologies.
//           </Text>
//         </View>

//         {/* SERVICES */}

//         <View style={styles.section}>
//           <Text style={styles.heading}>
//             What We Do
//           </Text>

//           <View style={styles.grid}>
//             {services.map((item, index) => (
//               <View key={index} style={styles.card}>
//                 {item.icon}

//                 <Text style={styles.cardTitle}>
//                   {item.title}
//                 </Text>

//                 <Text style={styles.cardDesc}>
//                   {item.desc}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* INDUSTRIES */}

//         <View style={styles.section}>
//           <Text style={styles.heading}>
//             Industries We Serve
//           </Text>

//           <View style={styles.tags}>
//             {industries.map((item) => (
//               <View key={item} style={styles.tag}>
//                 <Text style={styles.tagText}>{item}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* WHY */}

//         <View style={styles.section}>
//           <Text style={styles.heading}>
//             Why Choose ITSoftLab360
//           </Text>

//           <View style={styles.whyCard}>
//             <ShieldCheck color="#2563EB" size={30} />

//             <View style={{ marginLeft: 15 }}>
//               <Text style={styles.whyTitle}>
//                 Enterprise-Grade Solutions
//               </Text>

//               <Text style={styles.cardDesc}>
//                 Secure, scalable and customized software
//                 designed around your business needs.
//               </Text>
//             </View>
//           </View>

//           <View style={styles.whyCard}>
//             <Users color="#2563EB" size={30} />

//             <View style={{ marginLeft: 15 }}>
//               <Text style={styles.whyTitle}>
//                 Dedicated Support
//               </Text>

//               <Text style={styles.cardDesc}>
//                 From planning to deployment and ongoing
//                 maintenance, we&apos;re with you every step.
//               </Text>
//             </View>
//           </View>

//           <View style={styles.whyCard}>
//             <Building2 color="#2563EB" size={30} />

//             <View style={{ marginLeft: 15 }}>
//               <Text style={styles.whyTitle}>
//                 Industry Expertise
//               </Text>

//               <Text style={styles.cardDesc}>
//                 Solutions tailored for Healthcare,
//                 Manufacturing, Retail, Education and
//                 many other industries.
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* CTA */}

//         <LinearGradient
//           colors={["#2563EB", "#1D4ED8"]}
//           style={styles.cta}
//         >
//           <Text style={styles.ctaTitle}>
//             Ready to Transform Your Business?
//           </Text>

//           <Text style={styles.ctaText}>
//             Let&apos;s build software that simplifies your
//             operations and accelerates business growth.
//           </Text>

//           {/* <TouchableOpacity style={styles.whiteButton}>
//             <Text style={styles.whiteButtonText}>
//               Contact Us
//             </Text>
//           </TouchableOpacity> */}
//         </LinearGradient>

//         <View style={{ height: 50 }} />
//       </ScrollView>
//     </>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   safe: {
//     flex: 1,
//   },

//   hero: {
//     padding: 28,
//     paddingTop: 80,
//     paddingBottom: 60,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 34,
//     fontWeight: "800",
//     lineHeight: 42,
//   },

//   subtitle: {
//     color: "#E2E8F0",
//     fontSize: 16,
//     marginTop: 18,
//     lineHeight: 25,
//   },

//   button: {
//     marginTop: 30,
//     backgroundColor: "#2563EB",
//     alignSelf: "flex-start",
//     paddingHorizontal: 22,
//     paddingVertical: 14,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     marginRight: 8,
//   },

//   section: {
//     padding: 22,
//   },

//   heading: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#0F172A",
//     marginBottom: 16,
//   },

//   paragraph: {
//     fontSize: 16,
//     color: "#475569",
//     lineHeight: 28,
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   card: {
//     width: "48%",
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 18,
//     marginBottom: 15,
//     elevation: 3,
//   },

//   cardTitle: {
//     marginTop: 15,
//     fontWeight: "700",
//     fontSize: 17,
//     color: "#0F172A",
//   },

//   cardDesc: {
//     marginTop: 8,
//     color: "#64748B",
//     lineHeight: 22,
//   },

//   tags: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },

//   tag: {
//     backgroundColor: "#DBEAFE",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 50,
//     margin: 6,
//   },

//   tagText: {
//     color: "#1D4ED8",
//     fontWeight: "600",
//   },

//   whyCard: {
//     backgroundColor: "white",
//     borderRadius: 18,
//     padding: 20,
//     marginBottom: 15,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   whyTitle: {
//     fontWeight: "700",
//     fontSize: 18,
//     color: "#0F172A",
//     marginBottom: 5,
//   },

//   cta: {
//     margin: 20,
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//   },

//   ctaTitle: {
//     color: "white",
//     fontSize: 28,
//     fontWeight: "800",
//     textAlign: "center",
//   },

//   ctaText: {
//     color: "#E2E8F0",
//     marginTop: 12,
//     textAlign: "center",
//     lineHeight: 24,
//   },

//   whiteButton: {
//     backgroundColor: "white",
//     marginTop: 25,
//     paddingHorizontal: 30,
//     paddingVertical: 14,
//     borderRadius: 12,
//   },

//   whiteButtonText: {
//     color: "#2563EB",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  // SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Building2,
  Smartphone,
  Globe,
  BrainCircuit,
  Boxes,
  ShieldCheck,
  Users,
  X,
  ChevronRight,
  BriefcaseBusiness,
  ShoppingCart,
  Truck,
  Store,
  GraduationCap,
  FileText,
  Handshake,
  Settings,
  Bot,
  UserRound,
} from "lucide-react-native";
import { Stack } from "expo-router";

type Product = {
  name: string;
  shortName: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
};

const products: Product[] = [
  {
    name: "HRMSM",
    shortName: "Human Resource Management System",
    description:
      "A complete human resource management platform that helps organizations manage employees, attendance, leave, payroll, performance, policies, reimbursements and other HR operations from one centralized system.",
    features: [
      "Employee Management",
      "Attendance & Face Recognition",
      "Leave Management",
      "Payroll Management",
      "Performance Management",
      "Policy Management",
      "Reimbursements",
    ],
    icon: <UserRound color="#2563EB" size={28} />,
  },
  {
    name: "ERP",
    shortName: "Enterprise Resource Planning",
    description:
      "An integrated enterprise platform that connects important business operations and provides organizations with centralized data, workflows and reporting.",
    features: [
      "Business Operations",
      "Finance Management",
      "Inventory",
      "Procurement",
      "Reporting",
      "Centralized Data",
    ],
    icon: <Boxes color="#2563EB" size={28} />,
  },
  {
    name: "CRM",
    shortName: "Customer Relationship Management",
    description:
      "A customer relationship platform designed to help businesses manage leads, customers, communication, sales activities and long-term customer relationships.",
    features: [
      "Lead Management",
      "Customer Management",
      "Sales Pipeline",
      "Follow-ups",
      "Communication Tracking",
      "Reports & Analytics",
    ],
    icon: <Handshake color="#2563EB" size={28} />,
  },
  {
    name: "POS",
    shortName: "Point Of Sales",
    description:
      "A modern point-of-sale solution for managing sales, products, customers, billing and transactions efficiently across retail and other businesses.",
    features: [
      "Fast Billing",
      "Product Management",
      "Inventory Tracking",
      "Customer Management",
      "Sales Reports",
      "Transaction Management",
    ],
    icon: <ShoppingCart color="#2563EB" size={28} />,
  },
  {
    name: "QMS",
    shortName: "Queue Management System",
    description:
      "A queue management solution designed for hospitals, malls, service centers and other organizations to organize customer flow and reduce waiting time.",
    features: [
      "Digital Token Management",
      "Queue Tracking",
      "Counter Management",
      "Customer Notifications",
      "Display Management",
      "Queue Analytics",
    ],
    icon: <Settings color="#2563EB" size={28} />,
  },
  {
    name: "AI Automation",
    shortName: "Artificial Intelligence & Automation",
    description:
      "AI-powered automation solutions that help businesses automate repetitive tasks, improve workflows and build intelligent digital experiences.",
    features: [
      "AI Assistants",
      "Workflow Automation",
      "Intelligent Data Processing",
      "Automated Communication",
      "AI-powered Applications",
      "Business Process Automation",
    ],
    icon: <Bot color="#2563EB" size={28} />,
  },
  {
    name: "SFA",
    shortName: "Sales Force Automation",
    description:
      "A sales automation platform that helps field sales teams manage customers, visits, orders, targets and sales activities efficiently.",
    features: [
      "Sales Team Management",
      "Field Visit Tracking",
      "Customer Management",
      "Order Management",
      "Sales Targets",
      "Performance Reports",
    ],
    icon: <BriefcaseBusiness color="#2563EB" size={28} />,
  },
  {
    name: "Supply Chain & Logistics",
    shortName: "Supply Chain & Logistics Management",
    description:
      "A platform for managing supply chain operations, logistics, movement of goods, inventory and operational workflows.",
    features: [
      "Inventory Management",
      "Logistics Management",
      "Shipment Tracking",
      "Order Processing",
      "Warehouse Operations",
      "Supply Chain Analytics",
    ],
    icon: <Truck color="#2563EB" size={28} />,
  },
  {
    name: "VMS",
    shortName: "Vendor Management System",
    description:
      "A vendor management platform that helps organizations manage vendors, vendor operations, documentation, performance and business relationships.",
    features: [
      "Vendor Registration",
      "Vendor Management",
      "Document Management",
      "Vendor Performance",
      "Approvals",
      "Reports",
    ],
    icon: <Building2 color="#2563EB" size={28} />,
  },
  {
    name: "LMS",
    shortName: "Learning Management System",
    description:
      "A learning platform for organizations and educational institutions to manage courses, learning content, users, assessments and training activities.",
    features: [
      "Course Management",
      "Learning Content",
      "User Management",
      "Assessments",
      "Training Tracking",
      "Learning Reports",
    ],
    icon: <GraduationCap color="#2563EB" size={28} />,
  },
  {
    name: "DoMS",
    shortName: "Document Management System",
    description:
      "A secure digital document management solution that helps organizations store, organize and access important documents while maintaining privacy and controlled access.",
    features: [
      "Digital Document Storage",
      "Secure Folders",
      "Document Organization",
      "Access Control",
      "Document Search",
      "Privacy-focused Storage",
    ],
    icon: <FileText color="#2563EB" size={28} />,
  },
  {
    name: "DMS",
    shortName: "Dealer Management System",
    description:
      "A dealer management platform that helps businesses manage dealers, sales operations, orders, products and dealer relationships from a centralized system.",
    features: [
      "Dealer Management",
      "Dealer Registration",
      "Order Management",
      "Product Management",
      "Dealer Performance",
      "Sales Reports",
    ],
    icon: <Store color="#2563EB" size={28} />,
  },
];

const industries = [
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Banking",
  "Hospitality",
  "Construction",
  "Logistics",
];

const services = [
  {
    icon: <Boxes color="#2563EB" size={28} />,
    title: "Enterprise Software",
    desc: "ERP, CRM, HRMS, POS & Business Solutions",
  },
  {
    icon: <Globe color="#2563EB" size={28} />,
    title: "Web Development",
    desc: "Modern websites & enterprise portals",
  },
  {
    icon: <Smartphone color="#2563EB" size={28} />,
    title: "Mobile Apps",
    desc: "Android & iOS applications",
  },
  {
    icon: <BrainCircuit color="#2563EB" size={28} />,
    title: "AI & Automation",
    desc: "AI assistants & workflow automation",
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <View>
      <Stack.Screen
        options={{
          title: "ITSOFTLAB360",
        }}
      />

      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}

        <LinearGradient
          colors={["#0F172A", "#1E3A8A"]}
          style={styles.hero}
        >
          <Text style={styles.title}>
            Transforming Businesses with Smart Technology
          </Text>

          <Text style={styles.subtitle}>
            ITSoftLab360 builds enterprise software, mobile apps,
            AI-powered automation, and custom digital solutions
            that help businesses grow faster.
          </Text>
        </LinearGradient>

        {/* ABOUT */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            What is ITSoftLab360?
          </Text>

          <Text style={styles.paragraph}>
            ITSoftLab360 is a software development company helping
            startups, SMEs, and enterprises accelerate digital
            transformation through custom software, enterprise
            applications, AI automation, and cloud technologies.
          </Text>
        </View>

        {/* PRODUCTS */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Our Products
          </Text>

          <Text style={styles.sectionSubtitle}>
            Explore our complete range of business software solutions.
            Tap any product to learn more.
          </Text>

          <View style={styles.productGrid}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.name}
                style={styles.productCard}
                activeOpacity={0.75}
                onPress={() => setSelectedProduct(product)}
              >
                <View style={styles.productIcon}>
                  {product.icon}
                </View>

                <Text style={styles.productName}>
                  {product.name}
                </Text>

                <Text
                  style={styles.productShortName}
                  numberOfLines={2}
                >
                  {product.shortName}
                </Text>

                <View style={styles.learnMore}>
                  <Text style={styles.learnMoreText}>
                    View Details
                  </Text>

                  <ChevronRight
                    color="#2563EB"
                    size={16}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SERVICES */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            What We Do
          </Text>

          <View style={styles.grid}>
            {services.map((item, index) => (
              <View key={index} style={styles.card}>
                {item.icon}

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardDesc}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* INDUSTRIES */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Industries We Serve
          </Text>

          <View style={styles.tags}>
            {industries.map((item) => (
              <View key={item} style={styles.tag}>
                <Text style={styles.tagText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* WHY */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Why Choose ITSoftLab360
          </Text>

          <View style={styles.whyCard}>
            <ShieldCheck color="#2563EB" size={30} />

            <View style={styles.whyContent}>
              <Text style={styles.whyTitle}>
                Enterprise-Grade Solutions
              </Text>

              <Text style={styles.cardDesc}>
                Secure, scalable and customized software
                designed around your business needs.
              </Text>
            </View>
          </View>

          <View style={styles.whyCard}>
            <Users color="#2563EB" size={30} />

            <View style={styles.whyContent}>
              <Text style={styles.whyTitle}>
                Dedicated Support
              </Text>

              <Text style={styles.cardDesc}>
                From planning to deployment and ongoing
                maintenance, we&apos;re with you every step.
              </Text>
            </View>
          </View>

          <View style={styles.whyCard}>
            <Building2 color="#2563EB" size={30} />

            <View style={styles.whyContent}>
              <Text style={styles.whyTitle}>
                Industry Expertise
              </Text>

              <Text style={styles.cardDesc}>
                Solutions tailored for Healthcare,
                Manufacturing, Retail, Education and
                many other industries.
              </Text>
            </View>
          </View>
        </View>

        {/* CTA */}

        <LinearGradient
          colors={["#2563EB", "#1D4ED8"]}
          style={styles.cta}
        >
          <Text style={styles.ctaTitle}>
            Ready to Transform Your Business?
          </Text>

          <Text style={styles.ctaText}>
            Let&apos;s build software that simplifies your
            operations and accelerates business growth.
          </Text>
        </LinearGradient>

        <View style={{ height: 50 }} />
      </ScrollView>

      {/* PRODUCT DETAILS MODAL */}

      <Modal
        visible={selectedProduct !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProduct(null)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setSelectedProduct(null)}
          />

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                {selectedProduct?.icon}
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedProduct(null)}
              >
                <X color="#0F172A" size={22} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>
              {selectedProduct?.name}
            </Text>

            <Text style={styles.modalSubtitle}>
              {selectedProduct?.shortName}
            </Text>

            <Text style={styles.modalDescription}>
              {selectedProduct?.description}
            </Text>

            <Text style={styles.featuresTitle}>
              Key Features
            </Text>

            {selectedProduct?.features.map((feature) => (
              <View
                key={feature}
                style={styles.featureRow}
              >
                <View style={styles.featureDot} />

                <Text style={styles.featureText}>
                  {feature}
                </Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setSelectedProduct(null)}
            >
              <Text style={styles.closeModalButtonText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  hero: {
    padding: 28,
    paddingTop: 80,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 42,
  },

  subtitle: {
    color: "#E2E8F0",
    fontSize: 16,
    marginTop: 18,
    lineHeight: 25,
  },

  section: {
    padding: 22,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },

  sectionSubtitle: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 23,
    marginBottom: 18,
  },

  paragraph: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 28,
  },

  /* PRODUCTS */

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  productIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  productName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },

  productShortName: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    marginTop: 5,
    minHeight: 38,
  },

  learnMore: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  learnMoreText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 13,
    marginRight: 2,
  },

  /* SERVICES */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    marginTop: 15,
    fontWeight: "700",
    fontSize: 17,
    color: "#0F172A",
  },

  cardDesc: {
    marginTop: 8,
    color: "#64748B",
    lineHeight: 22,
  },

  /* INDUSTRIES */

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    margin: 6,
  },

  tagText: {
    color: "#1D4ED8",
    fontWeight: "600",
  },

  /* WHY */

  whyCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  whyContent: {
    marginLeft: 15,
    flex: 1,
  },

  whyTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#0F172A",
    marginBottom: 5,
  },

  /* CTA */

  cta: {
    margin: 20,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },

  ctaTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  ctaText: {
    color: "#E2E8F0",
    marginTop: 12,
    textAlign: "center",
    lineHeight: 24,
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: "85%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 18,
  },

  modalSubtitle: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 4,
  },

  modalDescription: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    marginTop: 16,
  },

  featuresTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 22,
    marginBottom: 10,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  featureDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2563EB",
    marginRight: 10,
  },

  featureText: {
    fontSize: 15,
    color: "#475569",
  },

  closeModalButton: {
    backgroundColor: "#0F172A",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 18,
  },

  closeModalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});