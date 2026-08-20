import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
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
} from "lucide-react-native";

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

export default function Home() {
  return (
    <SafeAreaView style={[styles.safe]}>
    <>
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

          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explore Solutions</Text>
            <ChevronRight color="white" size={18} />
          </TouchableOpacity> */}
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
                <Text style={styles.tagText}>{item}</Text>
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

            <View style={{ marginLeft: 15 }}>
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

            <View style={{ marginLeft: 15 }}>
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

            <View style={{ marginLeft: 15 }}>
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

          {/* <TouchableOpacity style={styles.whiteButton}>
            <Text style={styles.whiteButtonText}>
              Contact Us
            </Text>
          </TouchableOpacity> */}
        </LinearGradient>

        <View style={{ height: 50 }} />
      </ScrollView>
    </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  safe: {
    flex: 1,
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

  button: {
    marginTop: 30,
    backgroundColor: "#2563EB",
    alignSelf: "flex-start",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    marginRight: 8,
  },

  section: {
    padding: 22,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  paragraph: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 28,
  },

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

  whyCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  whyTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#0F172A",
    marginBottom: 5,
  },

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

  whiteButton: {
    backgroundColor: "white",
    marginTop: 25,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  whiteButtonText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 16,
  },
});